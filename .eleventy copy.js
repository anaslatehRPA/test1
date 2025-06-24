const slugify = require("slugify");

module.exports = function(eleventyConfig) {
  // Static passthrough: copy these files/folders as-is to the output
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("favicon");

  // Collection: products (from Markdown files in products folder)
  eleventyConfig.addCollection("products", function(collectionApi) {
    return collectionApi.getFilteredByGlob("products/*.md");
  });

  // Filters
  // Slug filter: supports Thai & English, removes special chars, lowercases, replaces spaces with -
  eleventyConfig.addFilter("slug", str => {
    if (!str) return 'none';
    let s = str.trim().replace(/\s+/g, '-');
    s = s.replace(/[^ก-๙a-zA-Z0-9\-]/g, '');
    return s.toLowerCase();
  });

  // Map filter: extract property from array of objects, supports nested keys (dot notation)
  eleventyConfig.addFilter("map", (arr, key) => {
    if (!Array.isArray(arr)) return [];
    return arr.map(item => {
      if (key && key.includes(".")) {
        return key.split(".").reduce((obj, k) => (obj ? obj[k] : undefined), item);
      }
      return key ? item[key] : item;
    });
  });

  // Unique filter: remove duplicate values from array
  eleventyConfig.addFilter("unique", arr => {
    return Array.isArray(arr) ? [...new Set(arr)] : arr;
  });

  // Reject filter: remove falsy values or specific value from array
  eleventyConfig.addFilter("reject", (arr, falsy) => {
    if (!Array.isArray(arr)) return arr;
    if (falsy === "falsy") {
      return arr.filter(Boolean);
    }
    return arr.filter(item => item !== falsy);
  });

  // Main directory config and pathPrefix for GitHub Pages
  return {
    pathPrefix: "/test1/", // เปลี่ยน test1 เป็นชื่อ repository ของคุณถ้าไม่ใช่ test1
    dir: {
      input: ".",
      includes: "_includes",
      output: "docs"
    }
  };
};