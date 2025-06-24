const slugify = require("slugify");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("favicon");

  eleventyConfig.addCollection("products", function(collectionApi) {
    return collectionApi.getFilteredByGlob("products/*.md");
  });

  // ฟิลเตอร์ slug สำหรับภาษาไทยและอังกฤษ (ไม่มี space/อักขระพิเศษ)
  eleventyConfig.addFilter("slug", str => {
    if (!str) return 'none';
    // ตัด space ต้น/ท้าย และแทนเว้นวรรคด้วย -
    let s = str.trim().replace(/\s+/g, '-');
    // ลบอักขระพิเศษ ยกเว้นอักษรไทย อังกฤษ ตัวเลข และขีดกลาง
    s = s.replace(/[^ก-๙a-zA-Z0-9\-]/g, '');
    // แปลงเป็นตัวพิมพ์เล็ก
    return s.toLowerCase();
  });

  eleventyConfig.addFilter("map", (arr, key) => {
    if (!Array.isArray(arr)) return [];
    return arr.map(item => {
      if (key && key.includes(".")) {
        return key.split(".").reduce((obj, k) => (obj ? obj[k] : undefined), item);
      }
      return key ? item[key] : item;
    });
  });

  eleventyConfig.addFilter("unique", arr => {
    return Array.isArray(arr) ? [...new Set(arr)] : arr;
  });

  eleventyConfig.addFilter("reject", (arr, falsy) => {
    if (!Array.isArray(arr)) return arr;
    if (falsy === "falsy") {
      return arr.filter(Boolean);
    }
    return arr.filter(item => item !== falsy);
  });

  return {
    dir: { input: ".", includes: "_includes" }
  };
};