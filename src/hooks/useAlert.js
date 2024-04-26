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
export const alertSuccess = ({ title, text, callback }) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "success"
  }).then((res) => {
    if (res.isConfirmed) {
      if(callback){
        callback();
      } else {
        return;
      } 
    }
  });
};

export const alertWarning = ({ title, text }) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "warning"
  });
};

/**
 * ERROR Alert
 * @param {errMsg} 에러메시지
 */
export const alertError = (errMsg, code, callback) => {
  Swal.fire({
    title: "에러",
    html: `${errMsg}. <br/> Error Code : ${code}`,
    icon: "error",
    confirmButtonText: "확인"
  }).then((res) => {
    if (res.isConfirmed) {
      if (typeof callback !== "function") return;
      callback();
    }
  });
};
