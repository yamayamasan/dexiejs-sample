

var db = new Dexie('AppDatabase');

db.version(1).stores({
  notes: "++id, title, body, *tags, updated_at"
});

// 一覧取得
db.notes.toArray().then(function(notes){
  var ul = $('ul#notes');
  notes.forEach(function(note){
    var li = $('<li>');
    var a = $('<a />', {
      class: "note",
      id: note.id,
      text: note.title,
      href: "#"
    }).appendTo(li);;
    ul.append(li);
  });
  console.log(notes);
});

// 詳細
$(document).on('click', "a.note", function(e){
  e.preventDefault();
  var noteId = parseInt($(this).attr('id'));

  db.notes.where('id').equals(noteId).first().then(function(note){
    $('#id').val(note.id);
    $('#title').val(note.title);
    $('#body').val(note.body);
    $('#tags').val(note.tags.join(','));
  });
});

// 保存
$(document).on('click', '#save', function(e){
    var id = $('#id').val();
    var title = $('#title').val();
    var body = $('#body').val();
    var tags = $('#tags').val();

    console.log(id);
    if (id === '') {
      db.notes.add({
        title: title,
        body: body,
        tags: tags.split(','),
        updated_at: new Date()
      });
    } else {
      db.notes.update(parseInt(id), {
        title: title,
        body: body,
        tags: tags.split(','),
        updated_at: new Date()
      });
    }
});

$(document).on('click', '#delete', function(){
    var id = $('#id').val();
    db.notes.delete(parseInt(id));
});
