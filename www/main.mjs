import { CameraUtils, ShareAPI, Notification } from "./utils.mjs";

const share = new ShareAPI();
const cameraUtils = new CameraUtils();
const notification = new Notification();

// Chờ DOM được tải xong
document.addEventListener("DOMContentLoaded", function () {
  const calculateAgeBtn = document.getElementById("calculateAgeBtn");
  calculateAgeBtn.onclick = calculateAge;
  //Phần camera
  const takePictureBtn = document.getElementById("takePictureBtn");
  const photoEl = document.getElementById("photo");
  cameraUtils.apply(
    takePictureBtn,
    (image) => {
      console.log(image);
      // Gán đường dẫn ảnh và hiển thị ảnh
      photoEl.src = image.webPath;
      photoEl.style.display = "block";
    },
    (errors) => {
      console.log(errors);
    }
  );
  //Phần thông báo
  const notificationBtn = document.getElementById("notificationBtn");
  notificationBtn.onclick = async () => {
    console.log("hi");
    await notification.sendNotification("Xin chào Bích Thùy", "QTh mập", "");
  };
  //Phần share
  const shareBtn = document.getElementById("shareBtn");
  shareBtn.onclick = async () => {
    await share.shareContent(
      "Xin chào Bích Thùy",
      "Qth mập",
      "https://www.facebook.com/ronial.04?locale=vi_VN"
    );
  };
});
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

async function calculateAge() {
  const birthYear = document.getElementById("birthYear").value;
  // const currentYear = new Date().getFullYear();

  // if (birthYear && birthYear >= 1900 && birthYear <= currentYear) {
  //   const age = currentYear - birthYear;
  //   const text = `Bạn ${age} tuổi.`;
  //   document.getElementById("result").innerText = text;
  //   await notification.sendNotification("Xin chào Bích Thùy", text, "");
  // } else {
  //   document.getElementById("result").innerText =
  //     "Vui lòng nhập năm sinh hợp lệ!";
  //   await notification.sendNotification(
  //     "Xin chào Bích Thùy",
  //     "Vui lòng nhập năm sinh hợp lệ!",
  //     ""
  //   );
  // }
  const f = celsiusToFahrenheit(birthYear);
  document.getElementById("result").innerText = f;
  await notification.sendNotification(
    "Xin chào Bích Thùy",
    `Độ F hiện tại ${f}F`,
    ""
  );
  await share.shareContent(
    "Xin chào Bích Thùy",
    `Độ F hiện tại ${f}F`,
    "https://www.facebook.com/ronial.04?locale=vi_VN"
  );
}
