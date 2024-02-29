var dropArea = document.getElementById('drop-area');

dropArea.addEventListener('dragover', function (e) {
    e.preventDefault();
    dropArea.style.border = '2px dashed #000';
});

dropArea.addEventListener('dragleave', function () {
    dropArea.style.border = '2px dashed #ccc';
});

dropArea.addEventListener('drop', function (e) {
    e.preventDefault();
    dropArea.style.border = '2px dashed #ccc';

    var files = e.dataTransfer.files;

    handleFiles(files);
});

dropArea.addEventListener('click', function () {
    document.getElementById('file-selector').click();
});

document.getElementById('file-selector').addEventListener('change', function () {
    var files = this.files;

    handleFiles(files);
});

function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        displayImage(file);
    }
}

function displayImage(file) {
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('my-div').innerHTML = '<img class="img" src="' + e.target.result + '">';
    };
    reader.readAsDataURL(file);
}