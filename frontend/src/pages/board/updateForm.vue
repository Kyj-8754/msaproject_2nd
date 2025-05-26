<template>
    <div class="container-fluid main-container">
		<div class="row h-100">
			<jsp:include page="/WEB-INF/views/common/nav.jsp"/>
			<!-- 우측 본문 -->
			<main class="col-md-10 main-area">
				<h2>게시물 수정</h2>
				<div class="card-body">
					<form id="boardForm" method="post">
						<!-- 레이블 줄 -->
						<div class="row mb-2">
							<div class="col-md-6 col-lg-6">
								<label for="title" class="form-label">제목</label>
							</div>
							<div class="col-md-3 col-lg-3">
								<label for="writer" class="form-label">작성자 ID</label>
							</div>
							<div class="col-md-3 col-lg-3">
								<label for="passwd" class="form-label">비밀번호</label>
							</div>
						</div>

						<!-- 입력 필드 줄 -->
						<div class="row align-items-center mb-4">
							<div class="col-md-6 col-lg-6">
								<input type="hidden" name="bno" id="bno" value="${boardDB.bno}">
								<input type="text" class="form-control" name="title" id="title"
									value="${boardDB.title}" required>
							</div>
							<div class="col-md-3 col-lg-3">
								<input type="text" class="form-control" name="writer" id="writer" readonly value="${boardDB.writer}">
							</div>
							<div class="col-md-3 col-lg-3">
								<input type="password" class="form-control" name="passwd"
									id="passwd" required>
							</div>
						</div>
						<div class="mb-4">
							<label for="content" class="form-label">내용</label>
							<textarea class="form-control" name="content" id="content"
								rows="10"
								style="resize: none; overflow: auto; max-height: 300px;"
								required>${boardDB.content}</textarea>
						</div>
						<div class="d-flex justify-content-end">
							<!-- 수정 -->
							<button type="submit" formaction="update" id="update" class="btn btn-primary me-2">수정</button>
							<!-- 삭제 -->
							<button type="submit" formaction="delete" id="delete" class="btn btn-danger">삭제하기</button>
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