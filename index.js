function btnSubmit() {
    $textarea = $('#textarea');
    $result = $('#result');
    handles = $textarea.val().trim().split(/\s+/);
    if (handles.length === 0 || handles[0] === "") {
        $result.val('');
        return;
    }
    $.getJSON("https://codeforces.com/api/user.info", {
        handles: handles.join(';'),
    }, function (data, status, xhr) {
        if (data.status !== "OK") {
            alert('请求失败');
            return;
        }
        result_data = [];
        data.result.forEach(item => {
            result_data.push(item.maxRating ? item.maxRating : 0);
        });
        $result.val(result_data.join('\n'));
    }).fail((jqxhr, status, error) => {
        $result.val(jqxhr.responseText);
    });
}
