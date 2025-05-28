<template>
	<div class="container-fluid main-container">
		<div class="row h-100">
			<main class="main-area">
				<div class="container mt-5">
					<div class="card-header text-center">
						<h3 class="mb-0">회원 상세보기</h3>
					</div>
					<table class="table table-group-divider">
						<tbody>
							<tr>
								<th scope="row">아이디</th>
								<td>{{memberDB.userid}}</td>
							</tr>
							<tr>
								<th scope="row">이름</th>
								<td>{{memberDB.name}}</td>
							</tr>
							<tr>
								<th scope="row">생년월일</th>
								<td>{{memberDB.birthdate}}</td>
							</tr>
							<tr>
								<th scope="row">핸드폰</th>
								<td>{{memberDB.phone_no}}</td>
							</tr>
							<tr>
								<th scope="row">주소</th>
								<td>{{memberDB.roadaddress}}{{memberDB.jibunaddress}}</td>
							</tr>
							<tr>
								<th scope="row">상세주소</th>
								<td>{{memberDB.detail_add}}</td>
							</tr>
							<tr>
								<th scope="row">최근 로그인</th>
								<td>{{memberDB.loginTime}}</td>
							</tr>
							<template v-if="memberStore.supervisor === 'Y'">
								<tr>
									<th scope="row">탈퇴 여부</th>
									<td>{{memberDB.is_deleted}}</td>
								</tr>
								<tr>
									<th scope="row">탈퇴일</th>
									<td>{{memberDB.deleted_at}}</td>
								</tr>
							</template>
						</tbody>
					</table>
					<!-- <c:if test="${memberDB.userid == SessionMember.userid}"> -->
					<div class="mt-4 d-flex justify-content-center gap-3">
						<a href="/yj" class="btn btn-outline-primary">메인으로</a> <a
							href="updateForm?userid=${memberDB.userid}"
							class="btn btn-primary">회원 수정</a> 
							<a id="unregist" href="unregister?userid=${memberDB.userid}" class="btn btn-danger">회원
							탈퇴</a>
					</div>
					<!-- </c:if> -->
				</div>
			</main>
		</div>
	</div>
</template>

<script setup>
  import {ref, onMounted} from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import axios from 'axios'
  import { useMemberStore } from '@/stores/member'

  const router = useRouter()
  const route = useRoute()
  const userid = route.query.userid
  const memberDB = ref({ list: [] })
  const memberStore = useMemberStore();

  onMounted(() => {
    axios.get('/api/member/detailView', { params: { userid }})
	.then(res => {
		memberDB.value = res.data.memberDB
		console.log(memberDB.value)
    })
  })

  function goToUpdateForm() {
  router.push({
    name: 'Board_UpdateForm',
    query: { userid: MemberDB.value.userid }
  })
}
</script>