<template>
    <div class="container-fluid main-container">
		<div class="row h-100">
			<!-- 우측 본문 -->
			<main class="col-md-10 main-area">
			<h2>게시물 목록</h2>
			<!-- 건수 : <select name="size" id="size">
				<c:forTokens items="10,30,90,100" delims="," var="size">
					<option value="${size}"
						${pageResponse.size == size ? 'selected' : ''}>${size}</option>
				</c:forTokens>
			</select> -->

			<!-- 현재 페이지 번호 / 전체 페이지 번호 -->
			<!-- (${pageResponse.pageNo}/${pageResponse.totalPage}) -->

			<!-- <form action="list?searchValue=${pageResponse.searchValue}"
				name="searchID" id="searchID">
				검색어 : <input type="text" name="searchValue" id="searchValue"
					value="${pageResponse.searchValue}"> <input type="submit"
					value="검색">
			</form> -->

			<table class="table table-striped table-hover table-bordered mt-4">
				<thead class="table-dark text-center">
					<tr>
						<th>글번호</th>
						<th>제목</th>
						<th>작성자</th>
						<th>등록일</th>
						<th>조회수</th>
						<!-- <template v-if="member.supervisor === 'Y'">
						<th>삭제여부</th>
						<th>삭제일</th>
						</template> -->
					</tr>
				</thead>
				<tbody class="text-center">
						<tr v-for="item in pageResponse.list" :key="item">
							<td>{{item.bno}}</td>
							<td><a :href="`detailView?bno=${item.bno}`">{{item.title}}</a></td>
							<td>{{item.writer}}</td>
							<td>{{item.reg_date}}</td>
							<td>{{item.view_count}}</td>
							<!-- <template v-if="member.supervisor === 'Y'">
								<td>{{item.is_deleted}}</td>
								<td>{{item.deleted_at}}</td>
							</template> -->
						</tr>
				</tbody>
			</table>
			<!-- 페이지 처리 -->
			<!-- <div class="d-flex justify-content-center">
			<template v-if="pageResponse.prev">
				<a href="list?pageNo=${pageResponse.startPage-1}&size=${pageResponse.size}
				<c:if test='${not empty pageResponse.searchValue}'>&searchValue=${pageResponse.searchValue}
    			</c:if>">이전 </a>
			</template>
			<c:forEach begin="${pageResponse.startPage}"
				end="${pageResponse.endPage}" var="pageNo">
				<a href="list?pageNo=${pageNo}&size=${pageResponse.size} <c:if test='${not empty pageResponse.searchValue}'>&searchValue=${pageResponse.searchValue}</c:if>">
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
			</div> -->
		</main>
	</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      pageResponse: {
        list: [{"bno" : "1","title":"임시 제목","writer":"임시작성자","reg_date":"2025-05-26","view_count":"0"},
          {"bno" : "2","title":"임시 제목","writer":"임시작성자","reg_date":"2025-05-26","view_count":"0"},
          {"bno" : "3","title":"임시 제목","writer":"임시작성자","reg_date":"2025-05-26","view_count":"0"},
          {"bno" : "4","title":"임시 제목","writer":"임시작성자","reg_date":"2025-05-26","view_count":"0"},
          {"bno" : "5","title":"임시 제목","writer":"임시작성자","reg_date":"2025-05-26","view_count":"0"},
          {"bno" : "6","title":"임시 제목","writer":"임시작성자","reg_date":"2025-05-26","view_count":"0"}
        ]
      }
    };
  },
};
</script>