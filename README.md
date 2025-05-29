
# Microfront React Vite

Este projeto implementa uma arquitetura de micro frontends utilizando **Vite** e **React**, com três aplicações principais:

- **Portal**: Host principal que orquestra os micro frontends.
- **Register**: Micro frontend responsável pelo cadastro de registros.
- **Upload**: Micro frontend responsável pelo upload de arquivos/documentos.
- **Shared**: Pacote compartilhado com tema, componentes reutilizáveis e stores Zustand.

---

## 🗂 Estrutura de Pastas

```bash
.
├── portal/       # Aplicação principal (host/container)
├── register/     # Micro frontend para cadastro de dados
├── upload/       # Micro frontend para upload de documentos
├── shared/       # Biblioteca compartilhada (tema, componentes, Zustand)
```

---

## ▶️ Como rodar localmente

> Para rodar todas as aplicações ao mesmo tempo em ambiente de desenvolvimento:

```bash
yarn dev
```

Esse comando irá:
- **Buildar** e **rodar o preview** do projeto `shared`
- **Buildar** e **rodar o preview** dos projetos `register` e `upload`
- Rodar o projeto `portal` em modo de desenvolvimento

> Isso permite que o **portal** consuma os micro frontends e o código compartilhado corretamente.

---

## Autenticação

O sistema possui uma autenticação simples baseada em e-mail. O login é realizado ao informar um dos e-mails abaixo, que definem as permissões do usuário:

| E-mail               | Permissões             |
|----------------------|------------------------|
| email1@email.com     | `register`             |
| email2@email.com     | `register`, `upload`   |
| Qualquer outro e-mail| Sem permissões         |

Essa lógica está implementada no `authStore` utilizando Zustand.

---

## ⚠️ Observação importante

Atualmente não há uma integração automática entre os pacotes via workspaces ou links simbólicos. Para melhorias futuras, considere:
- Usar **Yarn Workspaces**, **Turborepo**, ou **Nx**
- Ou criar scripts para rodar os micro frontends em modo `dev` em vez de `preview` para facilitar o hot reload durante o desenvolvimento

---

## 💡 Funcionalidades

### Portal
- Roteia para os micro frontends (`/register`, `/upload`)
- Gerencia o fluxo entre cadastro e envio de documentos

### Register
- Tela de cadastro com múltiplos campos (input, select, textarea)
- Utiliza `zustand` para salvar os dados temporariamente
- Após salvar, envia o registro para o localStorage

### Upload
- Upload de documento associado ao cadastro
- Usa o estado temporário para salvar o `File` em memória
- Ao concluir, volta ao portal e une os dados ao registro

### Shared
- Contém tema padronizado
- Componentes reutilizáveis (`Button`, `FileUpload`, etc)
- Stores globais (`authStore`, `registerStore`, `tmpStore`)

---

## 📦 Dependências

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [npm-run-all](https://github.com/mysticatea/npm-run-all) (para rodar múltiplos scripts simultaneamente)

---

## 🛠 To Do

- [ ] Adicionar hot reload nos micro frontends (`dev` ao invés de `preview`)
- [ ] Adicionar monorepo com `Yarn Workspaces` ou `Turborepo`
- [ ] Melhorar autenticação e navegação entre projetos
- [ ] Criar integração com backend e persistência real de registros/upload
