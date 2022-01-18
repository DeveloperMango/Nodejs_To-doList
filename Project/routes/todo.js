
/*
 * GET todo
- ToDo 목록 만들기 예제에 다양한 기능을 넣어보세요. -
1. 새로운 할 일을 추가할 때, 엔터 키를 입력하여 추가하기 
2. 완료된 할 일은 아래로 정렬하기
3. 여러 할 일을 한 번에 처리하기
4. 표와 관련된 다른 라이브러리 적용하기 (예시: jQuery DataTables) 
5. UI를 더 예쁘게 꾸며보기 
6. 할 일 목록을 데이터베이스에 저장하기 (예시: MongoDB)
7. 취소버튼 만들기
 */

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
		
		data.list[req.body.index] = null;	// 선택한 ToDo 항목 삭제
		data.list = data.list.filter(Boolean);	// 유효한 값 추려내기
		
		fs.writeFile('./todo_list.json', JSON.stringify(data), function (err) {
			res.json(true);
		});
	});
};

exports.cancel = function(req,res){
	fs.readFile('./todo_list.json',{
		'encoding': 'utf8'
	}, function (err, data) {
		data = JSON.parse(data);
		
		data.list[req.body.index].complete = false;
		data.list[req.body.index].cancel = true;	
		fs.writeFile('./todo_list.json', JSON.stringify(data), function (err) {
			res.json(true);
		});

	});
}