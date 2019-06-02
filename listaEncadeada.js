class ListaLinearEnc {
  constructor() {
    this.ptLista = null;
    //Aqui adcionarei um contador de elementos
    this.qtd = 0;
    this.playersNames = [];
    this.invertido = false;
    this.max = 10;
  }
  //Ok
  tahVazia() {
    if (this.ptLista == null) {
      return true;
    } else {
      return this.ptLista;
    }
  }

  tiraCarta() {
    let array = [0, 1, 3, 9, 12, 13];
    let rng = parseInt(Math.random() * (6 - 0) + 0);
    return array[rng];
  }

  executaCarta(carta, ptAtual) {
    switch (carta) {
      case 0:
        this.addtext(`\nImpedido de Jogar por 3 Rodadas`);
        return this.carta0(ptAtual);
      case 1:
        this.addtext(`\nPula o próximo Jogador`);
        return this.carta1(ptAtual);
        break;
      case 12:
        this.addtext(`\nInverte o Jogo`);
        return this.carta12(ptAtual);
        break;
      case 13:
        this.addtext(`\nPula N jogadores`);
        return this.carta13(ptAtual);
        break;
      case 3:
        this.addtext(`\nElimina o Terceiro Jogador Seguinte`);
        return this.carta3(ptAtual);
        break;
      case 9:
        this.addtext(`\nElimina o Jogador Anterior`);
        return this.carta9(ptAtual);
        break;
    }
  }

  addtext(string) {
    let newtext = string;
    const textoArea = document.FrameConsole.console;
    textoArea.value += newtext;
    textoArea.scrollTop = textoArea.scrollHeight;
  }

  cleantext() {
    const textoArea = document.FrameConsole.console;
    console.log(textoArea);
    textoArea.value = "";
    textoArea.scrollTop = textoArea.scrollHeight;
    console.log("aqui");
  }

  //Com as funções acima torna-se mais fácil mostrar no console os jogadores restantes
  mostraJogadores() {
    let sentido = this.invertido ? "Anti-Horário" : "Horário";
    this.addtext(`Sentido: ${sentido}`);
    this.addtext(` `);
    this.addtext(`\nJogadores restantes: `);
    this.addtext(`\n${this.playersNames}\n`);
    this.addtext(` `);
  }

  rodada() {
    this.jogoMain(this.ptLista);
  }

  jogadas(i, ponteiro) {
    let ptAux = ponteiro;
    let j = i;
    while (this.qtd > 1) {
      this.addtext(`\n<Jogada ${j}>`);
      if (ptAux.flag > 0) {
        this.addtext(
          `\nO Jogador ${ptAux.chave} está impedido por mais ${
            ptAux.flag
          } jogada(s).`
        );
        ptAux.flag--;
        ptAux = this.invertido ? ptAux.anteNodo : ptAux.proxNodo;
        this.addtext(`\n</Jogada ${j}>\n`);
        this.addtext(`\n`);
        j++;
        this.mostraJogadores();
      } else {
        this.addtext(`\nA vez do Jogador ${ptAux.chave}:`);
        confirm(
          "A vez é de: " +
            ptAux.chave +
            "\nPressione Ok para retirar uma carta."
        );

        //Carta retirada
        let obj = this.executaCarta(this.tiraCarta(), ptAux);
        this.addtext(`\nTirou a Carta ${obj.carta}:`);
        //Definição do Rumo do Jogo
        if (obj != null) {
          ptAux = obj.fa;
        } else {
          ptAux = ptAux.proxNodo;
        }
        this.addtext(`\n</Jogada ${j}>\n`);
        this.addtext(`\n`);
        j++;
        this.mostraJogadores();
      }
    }
    return ptAux;
  }

  jogoMain(inicio) {
    let ptAux = inicio;
    let cont = 1;
    while (this.qtd > 1) {
      this.addtext(`\n<Rodada ${cont}>\n`);
      let i = 1;
      ptAux = this.jogadas(i, ptAux);
      this.addtext(`\n</Rodada ${cont}>\n`);
      cont++;
    }
    this.addtext(`\nVencedor é ${ptAux.chave}`);
  }
  //Impede Jogador
  carta0(ptAtual) {
    if (this.invertido) {
      ptAtual.flag = 2;
      confirm(
        "Carta 0: O jogador está impedido." +
          "\nO jogador(a) " +
          ptAtual.chave +
          " está Impedido."
      );
      return { fa: ptAtual.anteNodo, carta: 0 };
    } else {
      //Qtd de Jogadas Fora
      ptAtual.flag = 2;
      confirm(
        "Carta 0: O jogador está impedido." +
          "\nO jogador(a) " +
          ptAtual.chave +
          " está Impedido."
      );
      return { fa: ptAtual.proxNodo, carta: 0 };
    }
  }

  //Pula o proximo jogador e o proximo jogador passa a ser o prox do prox.
  carta1(ptAtual) {
    let futuroAtual = null;
    if (this.invertido) {
      //Codigo invertido(Anti-horario)
      futuroAtual = ptAtual.anteNodo.anteNodo;
      confirm(
        "Carta 2: Pula o jogador seguinte." +
          "\nO jogador(a) " +
          futuroAtual.proxNodo.chave +
          " será pulado(a)."
      );

      return { fa: futuroAtual, carta: 1 };
    } else {
      //(Sentido Horario)
      //Pula um Jogador pra frente
      futuroAtual = ptAtual.proxNodo.proxNodo;
      confirm(
        "Carta 2: Pula o jogador seguinte." +
          "\nO jogador(a) " +
          futuroAtual.anteNodo.chave +
          " será pulado(a)."
      );
      return { fa: futuroAtual, carta: 1 };
    }
  }
  // Inverte o Jogo
  carta12(ptAtual) {
    //Verifica se já está invertido
    if (this.invertido) {
      //se sim o jogo reverte pro sentido horario
      this.invertido = false;

      confirm(
        "Carta 12: O jogo inverte." +
          "\nO jogador(a) " +
          ptAtual.proxNodo.chave +
          " será o próximo a Jogar"
      );
      //Passando o proxNodo como prox jogador
      return { fa: ptAtual.proxNodo, carta: 12 };
    } else {
      //se nao for inverte pro anti-horario
      this.invertido = true;

      confirm(
        "Carta 12: O jogo inverte." +
          "\nO jogador(a) " +
          ptAtual.anteNodo.chave +
          " será o próximo a Jogar"
      );
      //Mandando o anteNodo com prox jogador
      return { fa: ptAtual.anteNodo, carta: 12 };
    }
    /*
    ptAnterior.proxNodo = ptAtual.proxNodo;
    if (ptAtual.chave == this.ptLista.chave) {
      this.ptLista = ptAtual.proxNodo;
    }
    this.qtd--;
    this.removeVetor(this.buscaLinear(ptAtual.chave));
    confirm(
      "Carta 3: O jogador atual é removido." +
        "\nO jogador(a) " +
        ptAtual.chave +
        " foi removido(a)."
    );
    return { fa: ptAtual.proxNodo, carta: 12 };*/
  }

  // Pula qnts Quiser
  carta13(ptAtual) {
    let num = parseInt(window.prompt("Digite quantos jogadores Deseja Pular:"));
    if (this.invertido) {
      let i = 0;
      while (i < num) {
        ptAtual = ptAtual.anteNodo;
        i++;
      }
      confirm(
        "Carta 13: O jogo inverte." +
          "\nO jogador(a) " +
          ptAtual.anteNodo.chave +
          " será o próximo a Jogar"
      );
      return { fa: ptAtual.anteNodo, carta: 13 };
    } else {
      let i = 0;
      while (i < num) {
        ptAtual = ptAtual.proxNodo;
        i++;
      }
      confirm(
        "Carta 13: O jogo inverte." +
          "\nO jogador(a) " +
          ptAtual.proxNodo.chave +
          " será o próximo a Jogar"
      );
      return { fa: ptAtual.proxNodo, carta: 13 };
    }
  }

  //Remove o Terceiro
  carta3(ptAtual) {
    let futuroAtual = null;
    if (this.invertido) {
      console.log("Terceiro Jogador Anti-Horario");
      //Codigo Invertido (Anti-Horario)
      futuroAtual = ptAtual.anteNodo;

      if (ptAtual.anteNodo.anteNodo.chave == this.ptLista.chave) {
        this.ptLista = futuroAtual.anteNodo.anteNodo;
      }

      this.removeVetor(this.buscaLinear(futuroAtual.anteNodo.chave));
      confirm(
        "Carta 3: Remova o terceiro jogador seguinte, a partir do jogador atual." +
          "\nO jogador(a) " +
          futuroAtual.anteNodo.chave +
          " foi removido(a)."
      );
      //Se nao, nao muda-se nada e se prossegue com as associacoes
      //Preciso que ponteiro(anteNodo) do nodo proximo aponte para o objeto
      //apontado no (anteNodo) do Nodo a ser removido
      futuroAtual.anteNodo = futuroAtual.anteNodo.anteNodo;
      //Preciso que o (anteNodo) do proximo jogador depois do futuroAtual
      //Aponte para o FuturoAtual para manter a lista Duplamente Encadeada
      futuroAtual.anteNodo.proxNodo = futuroAtual;

      this.qtd--;
      return { fa: futuroAtual, carta: 3 };
    } else {
      console.log("Terceiro Jogador Horario");
      //Sentido Horario
      //Define o proximo jogador
      futuroAtual = ptAtual.proxNodo;

      //Se o jogador removido for o ponteiro da Lista jogamos o ponteiro pra frente.
      if (ptAtual.proxNodo.proxNodo.chave == this.ptLista.chave) {
        this.ptLista = futuroAtual.proxNodo.proxNodo;
      }

      this.removeVetor(this.buscaLinear(futuroAtual.proxNodo.chave));
      confirm(
        "Carta 3: Remova o terceiro jogador seguinte, a partir do jogador atual." +
          "\nO jogador(a) " +
          futuroAtual.proxNodo.chave +
          " foi removido(a)."
      );
      //Se nao, nao muda-se nada e se prossegue com as associacoes
      //Preciso que ponteiro(proxNodo) do nodo proximo aponte para o objeto
      //apontado no (proxNodo) do Nodo a ser removido
      futuroAtual.proxNodo = futuroAtual.proxNodo.proxNodo;
      //Preciso que o (anteNodo) do proximo jogador depois do futuroAtual
      //Aponte para o FuturoAtual para manter a lista Duplamente Encadeada
      futuroAtual.proxNodo.anteNodo = futuroAtual;

      this.qtd--;
      return { fa: futuroAtual, carta: 3 };
    }
  }
  //Remove o Anterior
  carta9(ptAtual) {
    if (this.invertido) {
      console.log("Anterior Jogador Anti-Horario");
      let antDoAnt = ptAtual.proxNodo.proxNodo;

      //Verifica se o jogador a ser removido é igual ao ponteiro da lista
      if (ptAtual.proxNodo.chave == this.ptLista.chave) {
        this.ptLista = ptAtual;
      }

      this.removeVetor(this.buscaLinear(antDoAnt.anteNodo.chave));

      confirm(
        "Carta 9: Remova o jogador anterior." +
          "\nO jogador(a) " +
          antDoAnt.anteNodo.chave +
          " foi removido(a)."
      );
      antDoAnt.anteNodo = ptAtual;
      ptAtual.proxNodo = antDoAnt;

      this.qtd--;
      console.log(ptAtual.anteNodo);
      return { fa: ptAtual.anteNodo, carta: 9 };
    } else {
      console.log("Anterior Jogador Horario");
      //Sentido Horário
      let antDoAnt = ptAtual.anteNodo.anteNodo;

      //Verifica se o jogador a ser removido é igual ao ponteiro da lista
      if (ptAtual.anteNodo.chave == this.ptLista.chave) {
        this.ptLista = ptAtual;
      }

      this.removeVetor(this.buscaLinear(antDoAnt.proxNodo.chave));

      confirm(
        "Carta 9: Remova o jogador anterior." +
          "\nO jogador(a) " +
          antDoAnt.proxNodo.chave +
          " foi removido(a)."
      );

      antDoAnt.proxNodo = ptAtual;
      ptAtual.anteNodo = antDoAnt;
      this.qtd--;
      console.log(ptAtual.proxNodo);
      return { fa: ptAtual.proxNodo, carta: 9 };
    }
  }

  //Inserção Duplamente Encadeada
  insereNohFim(nodo) {
    let ptAux = null;
    if (this.tahVazia() == true) {
      this.ptLista = nodo;
      this.playersNames.push(nodo.chave);
      return true;
    } else {
      ptAux = this.ptLista;
      //Faz a Tarefa de Percorrer até o "final" da lista onde o prox seja null
      ptAux = this.percorreInsere(ptAux);
      if (this.qtd < this.max - 1) {
        //Aqui ocorre o tratamento e duplo encadeamento
        this.Encadeia(ptAux, nodo);
        //Aqui aumenta o tamanho de qtd
        this.qtd++;
      }
      if (this.qtd == this.max - 1) {
        //Aqui ocorre o duplo encadeamento fechando a lista tornando-a circular
        this.Encircular(ptAux, nodo);
        this.qtd++;
        console.log(this.ptLista);
      }
    }
    return true;
  }

  //Função que retorna o ultimo elemento através de while(ptAux.proxNodo != null)
  percorreInsere(point) {
    let pt = point;
    while (pt.proxNodo != null) {
      pt = pt.proxNodo;
    }
    return pt;
  }

  //Tratamento de duplo encadeamento nas inserções
  Encadeia(ponteiro, nodo) {
    ponteiro.proxNodo = nodo;
    let inserido = ponteiro.proxNodo;
    inserido.anteNodo = ponteiro;
    this.playersNames.push(nodo.chave);
  }

  //Fechamento da lista tornando-a circular
  Encircular(ponteiro, nodo) {
    let inserido = null;
    //Encircula no proxNodo
    ponteiro.proxNodo = nodo;
    //inserido representa o nodo inserido
    inserido = ponteiro.proxNodo;
    //Encircula no anteNodo
    inserido.anteNodo = ponteiro;
    inserido.proxNodo = this.ptLista;
    this.ptLista.anteNodo = inserido;
  }

  // Busca o Index no vetor para alimentar o removeVetor
  buscaLinear(chave) {
    console.log(chave);
    let index = this.playersNames.indexOf(chave);
    return index;
  }

  //Com o index ele remove o elemento da lista tornando mais facil a amostragem
  removeVetor(index) {
    console.log(index);
    this.playersNames.splice(index, 1);
  }

  //Aqui eu tenho que universalizar essa busca de uma maneira inteligente.
  busca(chave, funcao) {
    if (this.tahVazia() == true) {
      return null;
    } else {
      //Busca Universal dependente da comparação implementada na função.
      let qtdAux = 1;
      let ptAux = this.ptLista;
      while (qtdAux <= this.qtd + 1) {
        //Função argumento de busca a ser verificada
        let result = funcao(ptAux, chave);
        if (result) {
          return ptAux;
        }
        //Iterações
        ptAux = ptAux.proxNodo;
        qtdAux++;
      }
      return false;
    }
  }
}
