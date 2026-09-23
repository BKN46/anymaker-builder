const categories = new Map([
  ['engine', ['动力', '#b56532', 'M3 9h3V6h9v3h3l3 3v6H6v-3H3z M9 3h6 M12 3v3']],
  ['liquid', ['液体', '#1682ac', 'M12 3C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-12z M8 15a4 4 0 0 0 4 4']],
  ['wheel', ['车轮', '#57667e', 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M12 3v5 M12 16v5 M3 12h5 M16 12h5']],
  ['torque', ['传动', '#956831', 'M3 9h5v6H3z M16 9h5v6h-5z M8 12h8 M10 5h4 M12 3v4 M10 19h4']],
  ['electric', ['电气', '#ae7a16', 'M13 2 5 14h6l-1 8 9-13h-7z']],
  ['control', ['控制', '#7353b4', 'M4 6h16 M4 12h16 M4 18h16 M8 3v6 M16 9v6 M10 15v6']],
  ['light', ['照明', '#b78b22', 'M9 18v-2a6 6 0 1 1 6 0v2z M9 21h6 M12 1v1 M2 8h2 M20 8h2']],
  ['connector', ['连接', '#607a91', 'M9 14 7 16a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0 M15 10l2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0 M8 16l8-8']],
  ['sound', ['声音', '#9161aa', 'M3 9h4l5-4v14l-5-4H3z M16 8a6 6 0 0 1 0 8 M19 5a10 10 0 0 1 0 14']],
  ['interface', ['仪表', '#50879f', 'M3 4h18v13H3z M8 21h8 M12 17v4 M6 13l4-4 3 2 5-5']],
  ['storage', ['存储', '#976c45', 'M3 6l9-4 9 4v12l-9 4-9-4z M3 6l9 4 9-4 M12 10v12 M7 4l9 4']],
  ['radio', ['无线', '#6964bd', 'M12 21V11 M9 21h6 M10 10a2 2 0 1 1 4 0 2 2 0 0 1-4 0 M7 5a7 7 0 0 0 0 10 M17 5a7 7 0 0 1 0 10 M4 2a11 11 0 0 0 0 16 M20 2a11 11 0 0 1 0 16']],
  ['weapon', ['装置', '#7c6b70', 'M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0 M12 2v6 M12 16v6 M2 12h6 M16 12h6']],
  ['aircraft', ['航空', '#437d9c', 'M12 2l2 8 7 4v3l-7-2v4l2 2h-8l2-2v-4l-7 2v-3l7-4z']],
  ['gas', ['气体', '#599993', 'M3 7h12a3 3 0 1 0-3-3 M3 12h16a3 3 0 1 1-3 3 M3 17h6a3 3 0 1 1-3 3']],
  ['hydraulic', ['液压', '#5089a7', 'M4 8h10v8H4z M14 12h6 M20 8v8 M2 5v14 M7 4v4 M7 16v4']],
  ['mechanical', ['机械', '#737d91', 'M9 3h6v3l3 2 3-1 2 5-3 2v3l-5 3-3-2-3 2-5-3v-3l-3-2 2-5 3 1 3-2z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0']],
  ['data', ['数据', '#6b68aa', 'M8 5 2 12l6 7 M16 5l6 7-6 7 M14 3l-4 18']],
  ['furniture', ['家具', '#a07152', 'M6 3h12v10H6z M4 13h16v4H4z M6 17v4 M18 17v4']],
  ['building', ['建材', '#718898', 'M3 3h18v18H3z M3 9h18 M3 15h18 M9 3v6 M15 9v6 M9 15v6']],
  ['sensor', ['传感', '#579279', 'M12 3a9 9 0 1 0 9 9 M12 7a5 5 0 1 0 5 5 M12 12l8-8 M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0']],
  ['miscellaneous', ['其他', '#788394', 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z']],
]);

export function categoryInfo(category) {
  const [label, color, path] = categories.get(category) || categories.get('miscellaneous');
  return { label, color, path };
}

export function createCategoryIcon(category) {
  const info = categoryInfo(category);
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.6');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('category-icon');
  svg.style.color = info.color;
  const path = document.createElementNS(svg.namespaceURI, 'path');
  path.setAttribute('d', info.path);
  svg.append(path);
  return svg;
}
