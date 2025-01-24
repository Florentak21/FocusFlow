// Les élements du DOM à manipuler
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.btn-filter');

/**
 * Gestionnaire d'événement pour le formulaire d'ajout de tâche.
 * Empêche le rechargement de la page et ajoute une nouvelle tâche.
 * @param {Event} e - L'événement de soumission du formulaire.
 */
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = todoInput.value.trim();
  if (taskText) {
    addTodo(taskText);
    todoInput.value = '';
  }
});

/**
 * Ajoute une nouvelle tâche à la liste des tâches.
 * @param {string} title - Le texte de la tâche à ajouter.
 */
function addTodo(title) {
  const todoItem = document.createElement('li');
  todoItem.className = 'todo-item';
  todoItem.innerHTML = `
    <label>
      <input type="checkbox" class="toggle-complete">
      <span>${title}</span>
    </label>
    <button class="delete-todo"><i class="fas fa-trash"></i></button>
  `;
  todoList.prepend(todoItem);
}

/**
 * Gestionnaire d'événement pour les actions sur les tâches.
 * Permet de marquer une tâche comme terminée ou de la supprimer.
 * @param {Event} e - L'événement de clic sur un élément de la liste.
 */
todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-todo') || e.target.closest('.delete-todo')) {
    const todoItem = e.target.closest('.todo-item');
    todoItem.remove();
  } else if (e.target.classList.contains('toggle-complete')) {
    const todoItem = e.target.closest('.todo-item');
    todoItem.classList.toggle('completed');
  }
});

/**
 * Gestionnaire d'événement pour les boutons de filtrage.
 * Permet de basculer entre les vues : Toutes, À faire, Faites.
 */
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    filterTodos(button.dataset.filter);
  });
});

/**
 * Filtre les tâches selon le type sélectionné.
 * @param {string} filter - Le filtre sélectionné ('all', 'pending', 'completed').
 */
function filterTodos(filter) {
  const todos = Array.from(todoList.children);
  todos.forEach(todo => {
    switch (filter) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'pending':
        todo.style.display = todo.classList.contains('completed') ? 'none' : 'flex';
        break;
      case 'completed':
        todo.style.display = todo.classList.contains('completed') ? 'flex' : 'none';
        break;
    }
  });
}