// Funções para abrir e fechar formulários
function openForm(formType) {
    document.getElementById('form-popup').style.display = 'block';
    if (formType === 'user') {
        document.getElementById('user-form').style.display = 'flex';
        document.getElementById('product-form').style.display = 'none';
    } else if (formType === 'product') {
        document.getElementById('user-form').style.display = 'none';
        document.getElementById('product-form').style.display = 'flex';
    }
}

function closeForm() {
    document.getElementById('form-popup').style.display = 'none';
}

// Funções para adicionar usuários e produtos
async function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    if (form.id === 'user-form') {
        const user = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
        await addUser(user);
        displayUsers();
    } else if (form.id === 'product-form') {
        const product = {
            name: document.getElementById('product-name').value,
            price: document.getElementById('product-price').value,
            description: document.getElementById('product-description').value
        };
        await addProduct(product);
        displayProducts();
    }
    closeForm();
}

async function addUser(user) {
    try {
        const response = await fetch('http://localhost:8080/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error(`Erro ao adicionar o usuário: ${response.statusText}`);
        }
        const savedUser = await response.json();
        return savedUser;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

async function addProduct(product) {
    try {
        const response = await fetch('http://localhost:8080/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        if (!response.ok) {
            throw new Error(`Erro ao adicionar o produto: ${response.statusText}`);
        }
        const savedProduct = await response.json();
        return savedProduct;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

// Funções para exibir usuários e produtos
async function getAllUsers() {
    try {
        const response = await fetch('http://localhost:8080/users', { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Erro ao obter os usuários: ${response.statusText}`);
        }
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function displayUsers() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Limpa a lista antes de adicionar novos usuários
    const users = await getAllUsers();
    if (users && users.length > 0) {
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.innerHTML = `
                <div class="d-flex justify-content-between">
                    <div>
                        <strong>Nome:</strong> <span class="user-name">${user.name}</span>
                        <br><strong>Email:</strong> <span class="user-email">${user.email}</span>
                        <br><strong>Senha:</strong> <span class="user-password">${user.password}</span>
                    </div>
                    <div>
                        <button class="btn btn-primary btn-sm" onclick="showEditForm('user', '${user.id}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.id}')">Deletar</button>
                    </div>
                </div>
                <form class="edit-form" style="display: none;">
                    <input type="hidden" class="edit-user-id" value="${user.id}">
                    <div class="mb-3">
                        <label for="edit-user-name" class="form-label">Nome</label>
                        <input type="text" class="form-control edit-user-name" value="${user.name}">
                    </div>
                    <div class="mb-3">
                        <label for="edit-user-email" class="form-label">Email</label>
                        <input type="email" class="form-control edit-user-email" value="${user.email}">
                    </div>
                    <div class="mb-3">
                        <label for="edit-user-password" class="form-label">Senha</label>
                        <input type="password" class="form-control edit-user-password" value="${user.password}">
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="saveUserEdits(event)">Salvar</button>
                </form>
            `;
            userList.appendChild(listItem);
        });
    } else {
        userList.innerHTML = '<li class="list-group-item text-center">Nenhum usuário cadastrado.</li>';
    }
}

async function getAllProducts() {
    try {
        const response = await fetch('http://localhost:8080/products', { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Erro ao obter os produtos: ${response.statusText}`);
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    const products = await getAllProducts();
    if (products && products.length > 0) {
        products.forEach(product => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.innerHTML = `
                <div class="d-flex justify-content-between">
                    <div>
                        <strong>Nome:</strong> <span class="product-name">${product.name}</span>
                        <br><strong>Preço:</strong> <span class="product-price">${product.price}</span>
                        <br><strong>Descrição:</strong> <span class="product-description">${product.description}</span>
                    </div>
                    <div>
                        <button class="btn btn-primary btn-sm" onclick="showEditForm('product', '${product.id}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.id}')">Deletar</button>
                    </div>
                </div>
                <form class="edit-form" style="display: none;">
                    <input type="hidden" class="edit-product-id" value="${product.id}">
                    <div class="mb-3">
                        <label for="edit-product-name" class="form-label">Nome</label>
                        <input type="text" class="form-control edit-product-name" value="${product.name}">
                    </div>
                    <div class="mb-3">
                        <label for="edit-product-price" class="form-label">Preço</label>
                        <input type="number" class="form-control edit-product-price" value="${product.price}">
                    </div>
                    <div class="mb-3">
                        <label for="edit-product-description" class="form-label">Descrição</label>
                        <textarea class="form-control edit-product-description">${product.description}</textarea>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="saveProductEdits(event)">Salvar</button>
                </form>
            `;
            productList.appendChild(listItem);
        });
    } else {
        productList.innerHTML = '<li class="list-group-item text-center">Nenhum produto cadastrado.</li>';
    }
}

// Funções para exibir formulário de edição
function showEditForm(type, id) {
    const forms = document.querySelectorAll('.edit-form');
    forms.forEach(form => form.style.display = 'none');
    const listItem = type === 'user' 
        ? document.querySelector(`.edit-user-id[value="${id}"]`).closest('.list-group-item')
        : document.querySelector(`.edit-product-id[value="${id}"]`).closest('.list-group-item');
    listItem.querySelector('.edit-form').style.display = 'block';
}

// Funções para deletar usuários e produtos
async function deleteUser(userId) {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
        try {
            const response = await fetch(`http://localhost:8080/users/${userId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`Erro ao deletar usuário: ${response.statusText}`);
            }
            alert('Usuário deletado com sucesso!');
            displayUsers();
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao deletar usuário.');
        }
    }
}

async function deleteProduct(productId) {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
        try {
            const response = await fetch(`http://localhost:8080/products/${productId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`Erro ao deletar produto: ${response.statusText}`);
            }
            alert('Produto deletado com sucesso!');
            displayProducts();
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao deletar produto.');
        }
    }
}

// Funções para salvar as edições
async function saveUserEdits(event) {
    event.preventDefault();
    const listItem = event.target.closest('.list-group-item');
    const userId = listItem.querySelector('.edit-user-id').value;
    const updatedUser = {
        name: listItem.querySelector('.edit-user-name').value,
        email: listItem.querySelector('.edit-user-email').value,
        password: listItem.querySelector('.edit-user-password').value
    };
    try {
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
        });
        if (!response.ok) {
            throw new Error(`Erro ao atualizar usuário: ${response.statusText}`);
        }
        alert('Usuário atualizado com sucesso!');
        displayUsers();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao atualizar usuário.');
    }
}

async function saveProductEdits(event) {
    event.preventDefault();
    const listItem = event.target.closest('.list-group-item');
    const productId = listItem.querySelector('.edit-product-id').value;
    const updatedProduct = {
        name: listItem.querySelector('.edit-product-name').value,
        price: listItem.querySelector('.edit-product-price').value,
        description: listItem.querySelector('.edit-product-description').value
    };
    try {
        const response = await fetch(`http://localhost:8080/products/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct)
        });
        if (!response.ok) {
            throw new Error(`Erro ao atualizar produto: ${response.statusText}`);
        }
        alert('Produto atualizado com sucesso!');
        displayProducts();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao atualizar produto.');
    }
}

// Inicializar listas ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    displayUsers();
    displayProducts();
});
