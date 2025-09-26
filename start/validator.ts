import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider(
  {
    'required': 'O campo {{ field }} é obrigatório',
    'exists': 'O campo {{field}} já está vinculado em outro registro',
    'unique': 'O campo {{field}} já está vinculado em outro registro',

    'database.exists': 'O campo {{field}} já está vinculado em outro registro',
    'database.unique': 'O campo {{field}} já está vinculado em outro registro',

    'string': 'O valor de {{ field }} precisa ser do tipo caractere',
    'number': 'O valor de {{ field }} precisa ser um número',
    'email': 'O valor não é um email válido',
    'minLength': 'O campo "{{ field }}" deve ter no mínimo {{ min }} caracteres',

    'userId.required': 'O identificador do usuário deve ser informado',
    'id.required': 'O identificador deve ser informado',

    'status.enum':
      'O status deve ser: PENDENTE, EM PROGRESSO, FINALIZADA, CANCELADA, ARQUIVADA, ATRASADA ou SOB REVISÃO',
    'priority.enum': 'A prioridade deve ser: ALTA, MÉDIA ou BAIXA',
  },
  {
    id: 'IDENTIFICADOR',
    userId: 'IDENTIFICADOR DO USUÁRIO',
    idToken: 'TOKEN',

    categoryName: 'CATEGORIA',

    status: 'STATUS',
    category: 'CATEGORIA',
    priority: 'PRIORIDADE',
    targetDate: 'DATA ALVO',
    description: 'DESCRIÇÃO',
    especification: 'ESPECIFICAÇÃO',

    name: 'NOME',
    email: 'E-MAIL',
    password: 'SENHA',
    oldPassword: 'SENHA ANTIGA',
    newPassword: 'NOVA SENHA',
    confirmPassword: 'CONFIRMAÇÃO DA SENHA',

    punds: 'LIBRAS',
    fontSize: 'TAMANHO DA FONTE',
    fontType: 'TIPO DE FONTE',
    contrast: 'CONTRASTE',
    readingMask: 'MÁSCARA DE LEITURA',
    readingGuide: 'GUIA DE LEITURA',
    voiceControl: 'CONTROLE POR VOZ',
    cursorEnlarged: 'CURSOR AUMENTADO',
    magnifyingGlassContent: 'LUPA',
  }
)
