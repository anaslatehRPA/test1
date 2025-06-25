const slugify = require("slugify");

module.exports = function(eleventyConfig) {
  // Static passthrough
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("favicon");
  eleventyConfig.addPassthroughCopy("admin");

  // Collections
  eleventyConfig.addCollection("products", function(collectionApi) {
    return collectionApi.getFilteredByGlob("products/*.md");
  });

  // Filters
  eleventyConfig.addFilter("slug", str => {
    if (!str) return 'none';
    let s = str.trim().replace(/\s+/g, '-');
    s = s.replace(/[^ก-๙a-zA-Z0-9\-]/g, '');
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

  // ตั้งค่า output directory เป็น docs (สำหรับ GitHub Pages) และ pathPrefix สำหรับ project page
  return {
    pathPrefix: "/test1/", // เปลี่ยน test1 ให้ตรงกับชื่อ repository ของคุณ
    dir: {
      input: ".",
      includes: "_includes",
      output: "docs"
    }
  };
};