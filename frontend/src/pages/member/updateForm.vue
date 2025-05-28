<template>
    <div class="container-fluid main-container">
		<div class="row h-100">
			<main class="main-area  d-flex justify-content-center">
				<div class="login-container mt-5">
					<h3 class="text-center mb-4">로그인</h3>
					<form action="login" id="login" method="post">
						<div class="mb-3">
							<label for="userid" class="form-label">아이디</label> <input
								type="text" class="form-control" id="userid" name="userid"
								value="${param.userid}" required>
						</div>
						<div class="mb-3">
							<label for="passwd" class="form-label">비밀번호</label> <input
								type="password" class="form-control" id="passwd" name="passwd"
								required>
						</div>
						<div class="d-flex justify-content-center gap-2">
						<input type="submit" class="btn btn-primary"  value="로그인">
						<input type="button" class="btn btn-secondary" onClick="location.href='registForm'" value="회원가입">
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
import { inject, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { addTodo } = inject('actions');
const todoItem =  reactive({ todo:"", desc:"" })

const addTodoHandler = () => {
    let { todo } = todoItem;
    if (!todo || todo.trim()==="") {
        alert('할일은 반드시 입력해야 합니다');
        return;
    }
    addTodo({ ...todoItem }, ()=>{
        router.push('/todos')
    });
}
</script>