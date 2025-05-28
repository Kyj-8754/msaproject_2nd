<template>
	<div class="container-fluid main-container">
		<div class="row h-100">
			<main class="main-area">
				<div class="container d-flex justify-content-center align-items-center min-vh-100">
					<div class="card shadow p-4 rounded w-100" style="max-width: 600px;">
						<h1 class="text-center mb-4">회원가입</h1>
						<form class="row g-3 needs-validation" name="registerForm" id="registerForm" @submit.prevent="regist" novalidate>
							<div class="mb-3">
								<label for="validationuserid" class="form-label">아이디</label>
								<div class="input-group has-validation">
									<input type="text" class="form-control" :class="useridValid ? 'is-valid' : 'is-invalid'"
									v-model="form.userid" name="userid" id="userid" aria-describedby="inputGroupPrepend" required>
									<button class="btn btn-outline-secondary" type="button" id="checkIdBtn" @click="checkIdBtn">중복 확인</button>
									<div class="invalid-feedback" id="useridFeedback">
										아이디는 영문 또는 숫자로 최소 8자 이상입력 해 주세요
									</div>
								</div>
							</div>
							<div class="mb-3">
								<label for="validationpasswd" class="form-label">비밀번호</label>
								<div class="input-group has-validation">
									<input type="password" class="form-control"  :class="isPasswdValid ? 'is-valid' : 'is-invalid'" 
									v-model="form.passwd" @input="onPasswdInput" name="passwd" id="passwd" aria-describedby="inputGroupPrepend" required>
									<div class="invalid-feedback" id="passwdFeedback">
										비밀번호는 8자 이상이며, 영문자/숫자/특수문자를 포함해야 합니다.
									</div>
								</div>
							</div>
							<div class="mb-3">
								<label for="validationpasswd2" class="form-label">비밀번호확인</label>
								<div class="input-group has-validation">
									<input type="password" class="form-control" :class="isPasswd2Valid ? 'is-valid' : 'is-invalid'"
									v-model="form.passwd2" name="passwd2" id="passwd2" aria-describedby="inputGroupPrepend" required>
									<div class="invalid-feedback" id="passwd2Feedback">
										비밀번호가 같지 않습니다.
									</div>
								</div>
							</div>
							<div class="mb-3">
								<label for="validationName" class="form-label">이름</label>
								<div class="input-group has-validation">
									<input type="text" class="form-control" :class="nameValid ? 'is-valid' : 'is-invalid'"
									v-model="form.name" name="name" id="name" aria-describedby="inputGroupPrepend" required>
									<div class="invalid-feedback">
										이름을 입력해 주세요
									</div>
								</div>
							</div>
							<div class="mb-3">
								<label class="form-label">생년월일</label>
								<div class="d-flex gap-2">
									<select class="form-select" id="birthYear" name="birthYear" required>
										<option value="">년</option>
									</select> 
									<select class="form-select" id="birthMonth" name="birthMonth" required>
										<option value="">월</option>
									</select> 
									<select class="form-select" id="birthDay" name="birthDay" required>
										<option value="">일</option>
									</select>
								</div>
							</div>
							<div class="mb-3">
								<label for="validationPhoneNo" class="form-label">핸드폰 번호</label>
								<div class="input-group has-validation">
									<input type="text" class="form-control" :class="{'is-valid': phone_noValid,'is-invalid': !phone_noValid}"
									v-model="form.phone_no" name="phone_no" id="phone_no" aria-describedby="inputGroupPrepend" required placeholder="숫자만 입력 01012345678">
									<div class="invalid-feedback">
										숫자만 입력해 주세요.
									</div>
								</div>
							</div>
							<div class="mb-3">
								<label for="validationPostCode" class="form-label">우편 번호</label>
								<div class="input-group">
									<input type="text" class="form-control" v-model="postcode" name="postcode" id="postcode" required>
									<button type="button" class="btn btn-outline-secondary" @click="openPostcode">
										우편번호 찾기
									</button>
								</div>
							</div>
							<div class="row g-3">
								<div class="col">
									<label for="validationPostCode" class="form-label">도로명주소</label>
									<div class="input-group has-validation">
										<input type="text" class="form-control" v-model="form.roadAddress" name="roadAddress" id="roadAddress" aria-describedby="inputGroupPrepend" required>
									</div>
								</div>
								<div class="col">
									<label for="validationJibunAddress" class="form-label">지번주소</label>
									<div class="input-group has-validation">
										<input type="text" class="form-control" v-model="form.jibunAddress" name="jibunAddress" id="jibunAddress" aria-describedby="inputGroupPrepend" required>
									</div>
								</div>
							</div>
							<div class="mb-3">
								<label for="validationDetailAdd" class="form-label">상세주소</label>
								<div class="input-group has-validation">
									<input type="text" class="form-control" v-model="form.detail_Add" name="detail_Add" id="detail_Add" aria-describedby="inputGroupPrepend" required>
									<div class="invalid-feedback">
										상세주소를 입력해 주세요
									</div>
								</div>
							</div>
							<div class="d-flex justify-content-center gap-2">
								<button class="btn btn-primary" type="submit">회원 가입</button>
							</div>
						</form>
					</div>
				</div>
			</main>
		</div>
</div>
</template>



<script>

// 다음 주소 api 적용
export default {
  methods: {
    openPostcode() {
      if (!window.daum || !window.daum.Postcode) {
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.onload = this.loadPostcode;
        document.body.appendChild(script);
      } else {
        this.loadPostcode();
      }
    },
    loadPostcode() {
      const width = 500;
      const height = 600;

      new window.daum.Postcode({
        oncomplete: (data) => {
          const roadAddr = data.roadAddress;
          let extraRoadAddr = '';

          if (data.bname !== '' && /[\uAC00-\uD7AF]+[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }

          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }

          if (extraRoadAddr !== '') {
            extraRoadAddr = ' (' + extraRoadAddr + ')';
          }

          document.getElementById('postcode').value = data.zonecode;
          document.getElementById('roadAddress').value = roadAddr;
          document.getElementById('jibunAddress').value = data.jibunAddress;
        }
      }).open({
        left: window.screenX + (window.innerWidth - width) / 2,
        top: window.screenY + (window.innerHeight - height) / 2
      });
    }
  }
};
</script>



<script setup>
  import { reactive, ref, computed } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const form = reactive({
	userid : '',
	passwd : '',
	passwd2 : '',
	name : '',
	phone_no : '',
	postcode : '',
	roadAddress : '',
	jibunAddress : '',
	detail_Add : '',

	isUseridValid: true,
 	useridChecked: false
  })


  const passwdTouched = ref(false)

// 비밀번호 유효성 검증 함수
const validatePassword = (value) => {
  const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/
  return pwRegex.test(value)
}

// 비밀번호 검사 같은지 검사
const checkPasswordMatch = (value, value2) => {
	return value.length > 0 && value2.length > 0 && value === value2;
}

// 아이디 유효성 검사
const validateUserId = (value) => {
  const trimmed = value.trim()
  const isValidLength = trimmed.length >= 8
  const isValidChars = /^[a-zA-Z0-9]+$/.test(trimmed)
  return isValidLength && isValidChars
}

// 핸드폰 입력 검사
function validatePhoneNo(value) {
	const pwRegex = /^01[016]\d{8}$/;
	return pwRegex.test(value);
}


// computed로 실시간 검증 결과 제공
const useridValid = computed(() => validateUserId(form.userid))
const isPasswdValid = computed(() => validatePassword(form.passwd))
const isPasswd2Valid = computed(() => checkPasswordMatch(form.passwd, form.passwd2))
const nameValid = computed(() => checkPasswordMatch(form.name))
const phone_noValid = computed(() => validatePhoneNo(form.phone_no))

// 사용자가 입력한 적이 있다는 걸 감지하는 함수
const onPasswdInput = () => {
  passwdTouched.value = true
}


  function regist() {
  const confirmRegist = confirm("회원 가입하시겠습니까?")
  if (!confirmRegist) return

  axios.post('/api/member/regist', form)
    .then(res => {
      if (!res.data.error) {
		  alert(res.data.message)
		  router.push({ name: 'Member_LoginForm'
			})
      } else {
        alert(res.data.message)
      }
    })
    .catch(err => {
      console.error('등록 실패', err)
      alert('등록 중 오류가 발생했습니다.')
    })
}


const checkIdBtn = () =>{
	const userid = form.userid;
	if(userid.length == 0){
		alert("아이디를 입력해주세요.");
		userid.focus();
		return;
	}

	 axios.post('/api/member/isExistUserId', { userid: form.userid })
    .then(res => {
      if (res.data.existUserId) {
		  alert("사용할 수 없는 아이디 입니다.")
      } else {
        alert("사용 가능한 아이디 입니다.")
      }
    })
    .catch(err => {
      console.error('등록 실패', err)
      alert('등록 중 오류가 발생했습니다.')
    })
}
</script>

