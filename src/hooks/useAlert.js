import Swal from "sweetalert2";

/**
 *
 * @param {icon} success , warning , error , question
 * @param {title} 제목
 * @param {text} 내용
 * @param {callback} 콜백함수
 */
export const alertConfirm = ({ icon, title, text, callback }) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    showCancelButton: true,
    confirmButtonText: "확인",
    cancelButtonText: "취소"
  }).then((res) => {
    if (res.isConfirmed) {
      if (typeof callback !== "function") return;

      callback();
    }
  });
};

/**
 * SUCCESS Alert
 * @param {title} 제목
 * @param {text} 내용
 */
export const alertSuccess = ({ title, text }) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "success"
  });
};

/**
 * ERROR Alert
 * @param {errMsg} 에러메시지
 */
export const alertError = (errMsg) => {
  Swal.fire({
    title: "에러",
    html: `에러가 발생했습니다. <br/> Error Message : ${errMsg}`,
    icon: "error"
  });
};
