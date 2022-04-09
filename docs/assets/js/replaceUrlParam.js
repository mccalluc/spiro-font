export default function(key, value) {
  const oldParamsObj = Object.fromEntries(new URL(location).searchParams);
  const newParamsObj = {...oldParamsObj, [key]: value};
  const newParamsStr = new URLSearchParams(newParamsObj).toString();
  history.replaceState(null, '', `?${newParamsStr}`)
}