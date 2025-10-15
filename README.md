# 🧠 Detecção de Objetos — Aplicação Web

## 📘 Visão Geral do Projeto

Este repositório contém o código-fonte para uma aplicação de **Detecção de Objetos**, estruturada para ser executada como um serviço web.  
O projeto combina um modelo de *Machine Learning* (tipicamente **YOLO**) com um **frontend web interativo**, permitindo que os usuários realizem detecções em imagens ou vídeos através de uma interface.

---

## 📁 Estrutura do Repositório

| Pasta/Arquivo | Descrição |
| :--- | :--- |
| `App/` | Contém a lógica principal do backend em Python, incluindo o carregamento do modelo de ML e o processamento das requisições de detecção. |
| `web/` | Contém todos os arquivos de frontend (HTML, CSS, JavaScript) para a interface do usuário. |
| `requirements.txt` | Lista todas as dependências Python necessárias para o projeto (framework web, bibliotecas de ML, etc.). |
| `wsgi.py` | Arquivo de interface **WSGI** (*Web Server Gateway Interface*), utilizado para configurar e servir a aplicação Python em servidores web. |

---

## 🚀 Como Configurar e Rodar

### 1. Requisitos

- Python **3.x**

---

### 2. Clonagem do Repositório

```bash
git clone https://github.com/Aniiz/detect.git
cd detect
```

---

### 3. Instalação das Dependências

É altamente recomendado o uso de um **ambiente virtual (venv)**:

```bash
# Criar e ativar o ambiente virtual
python -m venv venv
source venv/bin/activate  # Para Linux/macOS
# .\venv\Scripts\activate  # Para Windows
```

Instale as dependências listadas em `requirements.txt`:

```bash
pip install -r requirements.txt
```

---

### 4. Execução da Aplicação

Dependendo do framework Python utilizado (ex: **Flask**) e do ambiente de execução, siga um dos métodos abaixo:

#### 💻 Modo de Desenvolvimento (ex: Flask)

Se o backend estiver configurado para rodar com Flask:

```bash
# Pode ser necessário definir a variável de ambiente FLASK_APP
export FLASK_APP=wsgi.py
flask run
```

Acesse **http://127.0.0.1:5000** (ou a porta indicada) no seu navegador.

#### 🌐 Modo de Produção (ex: Gunicorn)

Para servidores de produção (necessita do Gunicorn instalado):

```bash
gunicorn wsgi:app
```

> ⚠️ O nome do objeto da aplicação (`app`) pode precisar ser ajustado dependendo de como está definido em `wsgi.py`.

---

## 🛠️ Personalização

- **Modelo de Detecção:**  
  Edite os arquivos dentro de `App/` para configurar o caminho, o tipo e os parâmetros do modelo (ex: peso `.pt` do YOLO) que será carregado.

- **Interface:**  
  Modifique os arquivos em `web/` para ajustar o layout, estilos ou interações do frontend.

---
