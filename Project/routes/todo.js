
/*
 * GET todo
- ToDo 목록 만들기 예제에 다양한 기능을 넣어보세요. -
1. (완) 새로운 할 일을 추가할 때, 엔터 키를 입력하여 추가하기 
2. 완료된 할 일은 아래로 정렬하기
3. 세부정보/일정 입력
4. 체크박스 만들기
5. UI와 표 관련된 다른 라이브러리 적용하기 (예시: jQuery DataTables) 
6. 할 일 목록을 데이터베이스에 저장하기 (예시: MongoDB)
7. (완) 취소버튼 만들기
 */

const { Console } = require('console');
var fs = require('fs');	// 파일 시스템 모듈

exports.list = function(req, res){	// ToDo 목록 가져오기
	fs.exists('./todo_list.json', function (exists) {	// ToDo 목록 존재 확인
		if(exists) {
			fs.readFile('./todo_list.json', {
				'encoding': 'utf8'
			}, function (err, list) {	// todo_list.json 파일 읽기
				res.json(list);
			});
		} else {
			var list = {	// 기본 ToDo 목록 형식
				'list': []
			};
				
			fs.writeFile('./todo_list.json', JSON.stringify(list), function (err) {	// todo_list.json 파일 쓰기
				res.json(list);
			});
		}
	});
};

exports.add = function(req, res){	// 새로운 ToDo 항목 추가하기
	var todo = {	// 기본 ToDo 항목 형식
		'contents': '',
		'complete': false
	};
	
	todo.contents = req.body.contents;
	
	fs.readFile('./todo_list.json', {
		'encoding': 'utf8'
	}, function (err, data) {
		data = JSON.parse(data);
		
		data.list.push(todo);	// 새로운 ToDo 항목 추가
		
		fs.writeFile('./todo_list.json', JSON.stringify(data), function (err) {
			res.json(true);
		});
	});
};

exports.complete = function(req, res){	// 선택한 ToDo 항목 완료하기
	fs.readFile('./todo_list.json', {
		'encoding': 'utf8'
	}, function (err, data) {
		data = JSON.parse(data);

		data.list[req.body.index].complete = true;

		data.list.sort(function(a,b){
		 
		});
		
		fs.writeFile('./todo_list.json', JSON.stringify(data), function (err) {
			res.json(true);
		});
	});
};

exports.del = function(req, res){	// 선택한 ToDo 항목 삭제하기
	fs.readFile('./todo_list.json', {
		'encoding': 'utf8'
	}, function (err, data) {
		data = JSON.parse(data);
		
		//data.list[req.body.index] = null;	// 선택한 ToDo 항목 삭제
		console.log(data.list);
		data.list = data.list.filter(Boolean);	// 유효한 값 추려내기
		console.log(data.list);
		
		fs.writeFile('./todo_list.json', JSON.stringify(data), function (err) {
			res.json(true);
		});
	});
};

exports.cancel = function(req, res){	// 완료된 ToDo 항목 롤백하기
	fs.readFile('./todo_list.json', {
		'encoding': 'utf8'
	}, function (err, data) {
		data = JSON.parse(data);
		
		data.list[req.body.index].complete = false;
		
		fs.writeFile('./todo_list.json', JSON.stringify(data), function (err) {
			res.json(true);
		});
	});
};