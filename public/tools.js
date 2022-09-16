// 获取制定form中的所有表单元素
const getFormElements = (formId) => {
  const form = document.getElementById(formId);
  const tagElements = form.querySelectorAll("input,select,textarea");
  if (tagElements.length > 0) {
    return Array.from(tagElements);
  }
  try {
    console.error(new Error("当前form没有表单内容，请检查后再试"));
  } catch (error) {
    console.log(error);
  }
  return false;
};
// 获取单选多选 选择的值
const getInputSelector = (ele) => {
  if (ele.checked) {
    return [ele.name, ele.value];
  }
};
// 获取input数据
const getInputData = (ele) => {
  const type = ele.type.toLowerCase();
  if (
    [
      "text",
      "password",
      "number",
      "file",
      "color",
      "hidden",
      "date",
      "search",
      "email",
      "tel",
      "url",
    ].includes(type)
  ) {
    return [ele.name, ele.value];
  } else if (["checkbox", "radio"].includes(type)) {
    return getInputSelector(ele);
  }
  return false;
};
// 整理数据
const serializeFormData = (ele) => {
  let result = [];
  if (["select", "textarea"].includes(ele.tagName.toLowerCase())) {
    result = [ele.name, ele.value];
  } else {
    result = getInputData(ele);
  }
  if (result && result[0]) {
    return result;
  }
  return false;
};
// 获取数据方法
const serializeForm = (formId) => {
  const eles = getFormElements(formId);
  const results = {};
  if (!eles) return results;
  for (let i = 0; i < eles.length; i++) {
    const tempData = serializeFormData(eles[i]);
    if (tempData) {
      const key = tempData[0];
      const value = tempData[1];
      if (results[key]) {
        if (typeof results[key] === "object") {
          results[key].push(value);
        } else {
          results[key] = [results[key], value];
        }
      } else {
        results[key] = value;
      }
    }
  }
  return results;
};
