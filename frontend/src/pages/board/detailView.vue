<template>
    <div class="container-fluid main-container">
		<div class="row h-100">
			<jsp:include page="/WEB-INF/views/common/nav.jsp"/>
			<!-- 우측 본문 -->
			 <main class="col-md-10 main-area">
				<h2>게시물 상세</h2>
				<!-- 게시글 내용 테이블 -->
				<div class="container mt-5">
					<table class="table" style="width: 100%; max-width: 1000px; margin: 0 auto;">
						<tbody>
							<tr class="title-row">
								<td colspan="4" style="font-size: 26px; font-weight: bold;">${boardDB.title}</td>
							</tr>
							<tr class="text-muted small">
								<td style="width: 25%;">작성자: <strong>${boardDB.writer}</strong></td>
								<td style="width: 25%;">작성일: ${boardDB.reg_date}</td>
								<td style="width: 25%;">조회수: ${boardDB.view_count}</td>
								<td style="text-align: right;">
									<form action="updateForm" method="post" class="d-inline">
										<input type="hidden" name="bno" value="${boardDB.bno}">
										<button type="submit" class="btn btn-outline-primary btn-sm">수정하기</button>
									</form>
								</td>
							</tr>
							<tr>
								<td colspan="4">
									<div class="p-3" style="min-height: 150px;">${boardDB.content}</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<!-- 댓글 입력 섹션 -->
				<div class="container mt-4" style="max-width: 1000px;">
					<div class="border rounded p-3">
						<strong class="mb-2 d-block">김용진</strong>
							<div class="d-flex align-items-center">
						      <input type="text" class="form-control me-2" style="min-width: 0;" placeholder="댓글을 남겨주세요">
						      <button class="btn btn-secondary flex-shrink-0">등록</button>
						    </div>
					</div>
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