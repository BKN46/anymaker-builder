const HAN_CHARACTERS = /\p{Script=Han}/u;

const descriptorLabels = new Map([
  ['rps', ['转速', 'Rotational speed (RPM)']],
  ['torque', ['扭矩', 'Torque']],
  ['throttle', ['油门', 'Throttle']],
  ['temperature', ['温度', 'Temperature']],
  ['pressure', ['压力', 'Pressure']],
  ['power', ['功率', 'Power']],
  ['value', ['数值', 'Value']],
  ['display_value', ['显示数值', 'Display value']],
  ['electric_consumption', ['耗电量', 'Electric consumption']],
  ['fuel_flow', ['燃油流量', 'Fuel flow']],
  ['is_on', ['开启状态', 'On state']],
  ['is_active', ['激活状态', 'Active state']],
  ['is_illuminated', ['点亮状态', 'Illuminated state']],
  ['is_pressed', ['按下状态', 'Pressed state']],
  ['is_connected', ['连接状态', 'Connection state']],
  ['is_engaged', ['啮合状态', 'Engaged state']],
  ['is_reverse', ['倒车状态', 'Reverse state']],
  ['input', ['输入', 'Input']],
  ['output', ['输出', 'Output']],
  ['signal', ['信号', 'Signal']],
  ['receive_signal', ['接收信号', 'Receive signal']],
  ['transmit_signal', ['发送信号', 'Transmit signal']],
]);

const networkLabels = new Map([
  ['electric', ['电线', 'Electric']],
  ['mechanical', ['机械连接', 'Mechanical']],
  ['liquid', ['液体管线', 'Liquid']],
  ['gas', ['气体管线', 'Gas']],
  ['belt', ['皮带', 'Belt']],
  ['data', ['数据线', 'Data']],
]);

function humanizeIdentifier(value) {
  return value
    .trim()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\b[a-z]/g, character => character.toUpperCase());
}

function localized(value, locale, fallback) {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text) return fallback;
  if (locale === 'zh') return text;
  // Definition files and future native imports are external data. Never let
  // an untranslated Chinese label leak into the English editor chrome.
  return HAN_CHARACTERS.test(text) ? fallback : humanizeIdentifier(text);
}

export function connectionNetworkLabel(kind, locale = 'en') {
  const label = networkLabels.get(kind);
  if (label) return locale === 'zh' ? label[0] : label[1];
  return localized(kind, locale, locale === 'zh' ? '连接' : 'Connection');
}

export function connectionDescriptorLabel(descriptor, locale = 'en') {
  const label = descriptorLabels.get(descriptor);
  if (label) return locale === 'zh' ? label[0] : label[1];
  return localized(descriptor, locale, locale === 'zh' ? '连接' : 'Data port');
}

export function connectionPortRoleLabel({ descriptor, type } = {}, locale = 'en') {
  if (descriptor) return connectionDescriptorLabel(descriptor, locale);
  if (type === 'surface' || type === 'port') return locale === 'zh' ? '物理端口' : 'Physical port';
  return connectionNetworkLabel(type, locale);
}
