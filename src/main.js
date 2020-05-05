const $siteList = $(".siteList");
//console.log($siteList);
const $lastli = $siteList.find("li.last");
const saving = localStorage.getItem("saving");
const savingObject = JSON.parse(saving);
const hashMap = savingObject || [
  {
    logo: "G",
    url: "https://github.com",
  },
  {
    logo: "B",
    url: "https://bilibili.com",
  },
  {
    logo: "C",
    url: "https://codepen.io",
  },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(".com", "")
    .replace(/\/.*/, ""); //删除/后面的部分
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
          
            <div class="site">
              <div class="logo">
                ${node.logo}
              </div>
              <div class="link">${simplifyUrl(node.url)}</div>
              <div class="close"><svg class="icon" >
    <use xlink:href="#icon-close1"></use>
</svg></div>
            </div>
        </li>`).insertBefore($lastli);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();
$(".new").on("click", () => {
  let url = window.prompt("请输入要添加的网址：");
  if (url.indexOf("https://") === -1) {
    url = "https://" + url;
  }
  if (url.indexOf("com") === -1) {
    url = url + ".com";
  }
  //console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0],
    logoType: "text",
    url: url,
  });

  render();
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("saving", string);
};

$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo === key.toUpperCase) {
      console.log(key);
      window.open(hashMap[i].url);
    }
  }
});
