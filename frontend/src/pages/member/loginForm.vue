<template>
    <div class="container-fluid main-container">
		<div class="row h-100">
			<jsp:include page="/WEB-INF/views/common/nav.jsp"/>
			<!-- 우측 본문 -->
			<main class="col-md-10 main-area  d-flex justify-content-center">
				<div class="login-container mt-5">
					<h3 class="text-center mb-4">로그인</h3>
					<form action="login" id="login" method="post">
						<div class="mb-3">
							<label for="userid" class="form-label">아이디</label> <input
								type="text" class="form-control" id="userid" name="userid"
								required>
								<!-- :value="param.userid" --> 
						</div>
						<div class="mb-3">
							<label for="passwd" class="form-label">비밀번호</label> <input
								type="password" class="form-control" id="passwd" name="passwd"
								required>
						</div>
						<div class="d-flex justify-content-center gap-2">
						<input type="submit" class="btn btn-primary"  value="로그인">
						<input type="button" class="btn btn-secondary" @click="registForm" value="회원가입">
						</div>
						<div class="d-flex justify-content-center gap-2">
						<a href="findID">아이디 찾기</a>
						<a href="findPW">비밀번호 찾기</a>
						</div>
					</form>
				</div>
			</main>
		</div>
	</div>
</template>

<script setup>
function registForm() {
  window.location.href = '/member/registForm';
}
</script>


<!-- 별도 css추가 -->
 <style>
    .login-container {
  width: 100%;
  max-width: 400px;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
 </style>