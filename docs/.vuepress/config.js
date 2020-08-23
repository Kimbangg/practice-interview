const { getFilesOf } = require("./util");

// .vuepress/config.js
module.exports = {
  base: "/woowa-practice-interview/",
  title: "우아한테크캠프3기 스터디 블로그",
  assetsPublicPath: "/",
  themeConfig: {
    sidebar: [
      {
        title: "CS",
        collapsable: false,
        children: getFilesOf("docs", "CS"),
      },
      {
        title: "Javascript",
        collapsable: false,
        children: getFilesOf("docs", "Javascript"),
      },
    ],
    repo: "https://github.com/woowa-techcamp-2020/practice-interview",
    repoLabel: "GitHub",
    editLinks: true,
    docsBranch: "master",
  },
};