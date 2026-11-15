import { useState, useEffect } from 'react';

export default function Home() {
  // 1. READ & LocalStorage: Başlangıçta verileri LocalStorage'dan çek
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [task, setTask] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editTask, setEditTask] = useState('');

  // LocalStorage Güncellemesi: todos listesi her değiştiğinde tarayıcı hafızasına kaydet
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 2. CREATE (Ekleme İşlemi)
  const handleAdd = () => {
    if (task.trim() === '') return;
    const newTodo = { id: Date.now(), text: task };
    setTodos([...todos, newTodo]);
    setTask(''); // inputu temizle
  };

  // 3. DELETE (Silme İşlemi)
  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // 4. UPDATE (Güncelleme İşlemi - Mod açma)
  const handleEditClick = (todo) => {
    setIsEditing(todo.id);
    setEditTask(todo.text);
  };

  // UPDATE (Güncelleme İşlemi - Kaydetme)
  const handleSaveEdit = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: editTask } : t)));
    setIsEditing(null);
    setEditTask('');
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 font-sans">
      <div className="max-w-xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg border border-slate-200">
        <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-8">
          Görev Yöneticisi
        </h1>
        
        {/* Ekleme Alanı */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            className="flex-1 border-2 border-slate-200 rounded-lg p-3 outline-none focus:border-indigo-500 transition-colors"
            placeholder="Yeni bir görev yaz..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button
            onClick={handleAdd}
            className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Ekle
          </button>
        </div>

        {/* Listeleme Alanı */}
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              {isEditing === todo.id ? (
                <div className="flex gap-3 flex-1">
                  <input
                    type="text"
                    className="flex-1 border-2 border-indigo-200 p-2 rounded-md outline-none"
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)}
                  />
                  <button onClick={() => handleSaveEdit(todo.id)} className="text-green-600 font-bold hover:text-green-700">
                    Kaydet
                  </button>
                </div>
              ) : (
                <>
                  <span className="flex-1 text-slate-700 text-lg">{todo.text}</span>
                  <div className="flex gap-4">
                    <button onClick={() => handleEditClick(todo)} className="text-amber-500 font-medium hover:text-amber-600 transition-colors">
                      Düzenle
                    </button>
                    <button onClick={() => handleDelete(todo.id)} className="text-rose-500 font-medium hover:text-rose-600 transition-colors">
                      Sil
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
          
          {todos.length === 0 && (
            <div className="text-center py-6 text-slate-400">
              <p>Harika! Yapılacak hiçbir görev yok.</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}