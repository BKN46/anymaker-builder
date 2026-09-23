// Export a named machine-code function embedded in Anymaker's game.gcl.
//@category Anymaker

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;

import ghidra.app.cmd.disassemble.DisassembleCommand;
import ghidra.app.decompiler.DecompInterface;
import ghidra.app.decompiler.DecompileResults;
import ghidra.app.script.GhidraScript;
import ghidra.program.model.address.Address;
import ghidra.program.model.address.AddressSet;
import ghidra.program.model.listing.Function;
import ghidra.program.model.symbol.SourceType;

public class ExportAnymakerGclFunction extends GhidraScript {
  @Override
  public void run() throws Exception {
    String[] args = getScriptArgs();
    if (args.length != 4) {
      throw new IllegalArgumentException(
        "usage: ExportAnymakerGclFunction <out-dir> <name> <code-offset> <code-length>");
    }

    File outDir = new File(args[0]);
    String name = args[1];
    long offset = Long.decode(args[2]).longValue();
    long length = Long.decode(args[3]).longValue();
    if (offset < 0 || length <= 0 || length > 0x100000) {
      throw new IllegalArgumentException("invalid GCL code range");
    }
    if (!outDir.isDirectory() && !outDir.mkdirs()) {
      throw new IllegalStateException("cannot create output directory: " + outDir);
    }

    Address start = currentProgram.getAddressFactory().getDefaultAddressSpace().getAddress(offset);
    Address end = start.add(length - 1);
    if (!currentProgram.getMemory().contains(start) || !currentProgram.getMemory().contains(end)) {
      throw new IllegalArgumentException("GCL code range is outside the imported binary");
    }
    new DisassembleCommand(start, null, true).applyTo(currentProgram, monitor);
    Function function = currentProgram.getFunctionManager().getFunctionContaining(start);
    if (function == null) {
      function = currentProgram.getFunctionManager().createFunction(
        name, start, new AddressSet(start, end), SourceType.USER_DEFINED);
    }
    if (function == null) throw new IllegalStateException("could not create GCL function");

    File output = new File(outDir, name + ".c");
    DecompInterface decompiler = new DecompInterface();
    decompiler.openProgram(currentProgram);
    try {
      DecompileResults result = decompiler.decompileFunction(function, 120, monitor);
      if (result == null || !result.decompileCompleted()) {
        throw new IllegalStateException("GCL decompile failed: " +
          (result == null ? "no result" : result.getErrorMessage()));
      }
      write(output, result.getDecompiledFunction().getC());
    }
    finally {
      decompiler.dispose();
    }
    println("Anymaker GCL function exported: " + output.getAbsolutePath());
  }

  private void write(File output, String text) throws Exception {
    PrintWriter writer = new PrintWriter(new BufferedWriter(new OutputStreamWriter(
      new FileOutputStream(output), StandardCharsets.UTF_8)));
    try {
      writer.print(text);
    }
    finally {
      writer.close();
    }
  }
}
