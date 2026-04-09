  const loginForm = document.getElementById('loginForm');
        const messageDiv = document.getElementById('message');
        const loginBtn = document.getElementById('loginBtn');

        function showMessage(message, type) {
            messageDiv.textContent = message;
            messageDiv.className = `message ${type}`;
            messageDiv.style.display = 'block';
            
            // Auto-esconder mensagens de erro após 5 segundos
            if (type === 'error') {
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 5000);
            }
        }

        function setLoading(isLoading) {
            if (isLoading) {
                loginBtn.disabled = true;
                loginBtn.innerHTML = 'Entrando...<span class="loading-spinner"></span>';
            } else {
                loginBtn.disabled = false;
                loginBtn.textContent = 'Entrar';
            }
        }

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;

            // Validação básica
            if (!email || !password) {
                showMessage('Por favor, preencha todos os campos!', 'error');
                return;
            }

            // Validação de formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Por favor, insira um e-mail válido!', 'error');
                return;
            }

            // Mostrar loading
            setLoading(true);
            
            // Simulação de requisição ao backend
            // SUBSTITUA ESTA PARTE pela sua chamada real de API
            setTimeout(() => {
                // Simula sucesso (em produção, verifique a resposta da API)
                const loginSuccessful = true; // Substitua pela validação real
                
                if (loginSuccessful) {
                    showMessage('Login realizado com sucesso! Redirecionando...', 'success');
                    
                    // Salvar preferência "Lembrar-me" se necessário
                    if (remember) {
                        localStorage.setItem('rememberUser', email);
                    }
                    
                    // Redirecionar após 1 segundo
                    setTimeout(() => {
                        window.location.href = '/dashboard';
                        // Para testar localmente, use uma página existente:
                        // window.location.href = 'dashboard.html';
                    }, 1000);
                } else {
                    setLoading(false);
                    showMessage('E-mail ou senha incorretos!', 'error');
                }
            }, 1500);
        });

        function socialLogin(provider) {
            showMessage(`Redirecionando para login com ${provider}` , 'success');
            
            // IMPLEMENTE AQUI a lógica de OAuth
            setTimeout(() => {
                // Exemplo de redirecionamento OAuth
                // window.location.href = /auth/${provider.toLowerCase()};
                console.log(`Login com ${provider} iniciado`);
            }, 1000);
        }

        // Link "Esqueceu a senha"
        document.querySelector('.forgot-password').addEventListener('click', function(e) {
            e.preventDefault();
            // Redirecione para página de recuperação
            window.location.href = '/recuperar-senha';
            // Para testar: showMessage('Redirecionando para recuperação de senha...', 'success');
        });

        // Link "Cadastre-se"
        document.getElementById('signupLink').addEventListener('click', function(e) {
            e.preventDefault();
            // Redirecione para página de cadastro
            window.location.href = '/cadastro';
            // Para testar: showMessage('Redirecionando para cadastro...', 'success');
        });

        // Preencher email se "Lembrar-me" estava ativo
        window.addEventListener('DOMContentLoaded', function() {
            const rememberedEmail = localStorage.getItem('rememberUser');
            if (rememberedEmail) {
                document.getElementById('email').value = rememberedEmail;
                document.getElementById('remember').checked = true;
            }
        });