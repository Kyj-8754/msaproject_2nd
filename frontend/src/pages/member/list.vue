<template>
    <div class="container-fluid main-container">
		<div class="row h-100">
			<main class="main-area">
				<h2>회원 관리</h2>


				<!-- 건수 : <select name="size" id="size">
					<c:forTokens items="10,30,90,100" delims="," var="size">
						<option value="${size}"
							{pageResponse.size == size ? 'selected' : ''}>${size}</option>
					</c:forTokens>
				</select> -->

				<!-- 현재 페이지 번호 / 전체 페이지 번호 -->
				(${pageResponse.pageNo}/${pageResponse.totalPage})<br />

				<form action="list?searchValue=${pageResponse.searchValue}"
					name="searchID" id="searchID">
					검색어 : <input type="text" name="searchValue" id="searchValue"
						value="${pageResponse.searchValue}"> <input type="submit"
						value="검색">
				</form>
				<table class="table table-bordered table-hover text-center align-middle">
					<thead class="table table-striped table-hover table-bordered align-middle text-center">
						<tr>
							<th style="width: 5%;">번호</th>
							<th style="width: 12%;">아이디</th>
							<th style="width: 12%;">이름</th>
							<th style="width: 14%;">생년월일</th>
							<th style="width: 10%;">관리자 여부</th>
							<th style="width: 16%;">로그인 일시</th>
							<th style="width: 12%;">로그인 차단여부</th>
							<th style="width: 10%;">탈퇴여부</th>
							<th style="width: 14%;">탈퇴 날짜</th>
						</tr>
					</thead>
					<tbody>
						<!-- <c:forEach items="${pageResponse.list}" var="item"
							varStatus="status">
							<tr>
								<td>${status.count + (pageResponse.pageNo - 1) * pageResponse.size}</td>
								<td><a href="detailView?userid=${item.userid}">${item.userid}</a></td>
								<td>${item.name}</td>
								<td>${item.birthdate}</td>
								<td>${item.supervisor}</td>
								<td>${item.loginTime}</td>
								<td><input type="checkbox"
									class="form-check-input ban-toggle"
									data-userid="${item.userid}"
									${item.fail_login == 5 ? 'checked' : ''}
									${item.supervisor == 'Y' ? 'disabled' : ''}></td>
								<td>${item.is_deleted}</td>
								<td>${item.deleted_at}</td>
							</tr>
						</c:forEach> -->
					</tbody>
				</table>
				
		
	<!-- 페이지 처리 -->
	<div class="d-flex justify-content-center">
	<c:if test="${pageResponse.prev}">
		<a
			href="list?pageNo=${pageResponse.startPage-1}&size=${pageResponse.size}<c:if test='${not empty pageResponse.searchValue}'>
      &searchValue=${pageResponse.searchValue}
    </c:if>">
			이전 </a>
	</c:if>
	<c:forEach begin="${pageResponse.startPage}"
		end="${pageResponse.endPage}" var="pageNo">
		<a
			href="list?pageNo=${pageNo}&size=${pageResponse.size}<c:if test='${not empty pageResponse.searchValue}'>&searchValue=${pageResponse.searchValue}</c:if>">
			<c:choose>
				<c:when test="${pageNo == pageResponse.pageNo}">
					<b>${pageNo}</b>
				</c:when>
				<c:otherwise>${pageNo}</c:otherwise>
			</c:choose>
		</a>&nbsp;
	</c:forEach>
	<c:if test="${pageResponse.next}">
		<a
			href="list?pageNo=${pageResponse.endPage+1}&size=${pageResponse.size}<c:if test='${not empty pageResponse.searchValue}'>&searchValue=${pageResponse.searchValue}
    </c:if>">
			다음 </a>
	</c:if>
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