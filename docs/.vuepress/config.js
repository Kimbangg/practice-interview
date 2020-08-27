const { getFilesOf } = require("./util");

// .vuepress/config.js
module.exports = {
  base: "/practice-interview/",
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
      {
        title: "React",
        collapsable: false,
        children: getFilesOf("docs", "React"),
      },
      {
        title: "Frontend",
        collapsable: false,
        children: getFilesOf("docs", "Frontend"),
      },
    ],
    repo: "https://github.com/woowa-techcamp-2020/practice-interview",
    repoLabel: "GitHub",
    editLinks: true,
    docsBranch: "master",
  },
};
