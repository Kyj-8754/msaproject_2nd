<template>
    <div class="container-fluid main-container">
		<div class="row h-100">
			<main class=" main-area">
				<h2>게시물 수정</h2>
				<div class="card-body">
					<form id="boardForm">
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
								<input type="hidden" name="bno" id="bno" :value="boardDB.bno">
								<input type="text" class="form-control" name="title" id="title" :value="boardDB.title" required>
							</div>
							<div class="col-md-3 col-lg-3">
								<input type="text" class="form-control" name="writer" id="writer" readonly :value="boardDB.writer">
							</div>
							<div class="col-md-3 col-lg-3">
								<input type="password" class="form-control" name="passwd" id="passwd" required>
							</div>
						</div>
						<div class="mb-4">
							<label for="content" class="form-label">내용</label>
							<textarea class="form-control" name="content" id="content" rows="10" style="resize: none; overflow: auto; max-height: 300px;" :value="boardDB.content" required></textarea>
						</div>
						<div class="d-flex justify-content-end">
							<!-- 수정 -->
							<button type="button" @click="Update" id="update" class="btn btn-primary me-2">수정</button>
							<!-- 삭제 -->
							<button type="button" @click="Delete" id="delete" class="btn btn-danger">삭제하기</button>
						</div>
					</form>
				</div>
			</main>
		</div>
	</div>
</template>

<script setup>
	import axios from 'axios'
	import {ref, onMounted} from 'vue'
	import { useRoute, useRouter } from 'vue-router'

	const router = useRouter()
	const route = useRoute()
	const bno = route.query.bno
	const boardDB = ref({ list: [] })

	onMounted(() => {
	axios.get('/api/board/updateForm', { params: { bno }})
	.then(res => {
	boardDB.value = res.data.boardDB
		})
	})

	// 업데이트
	function Update() {
		const confirmRegist = confirm("게시물 수정하시겠습니까?")
		if (!confirmRegist) return

		axios.post('/api/board/update', new FormData(document.getElementById('boardForm')))
			.then(res => {
			if (!res.data.error) {
				alert(res.data.message)
				router.push({ name: 'Board_DetailView',  query: { bno: bno }
				})
			} else {
			alert(res.data.message)
			}
			})
	}

	// 삭제
	function Delete() {
		const confirmRegist = confirm("게시물 삭제하시겠습니까?")
		if (!confirmRegist) return
		
		axios.post('/api/board/delete', new FormData(document.getElementById('boardForm')))
			.then(res => {
				if (!res.data.error) {
				alert(res.data.message)
				router.push({ name: 'Board_List'})
				} else {
					alert(res.data.message)
				}
			})
	}
</script>