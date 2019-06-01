class ListaLinearEnc {
  constructor() {
    this.ptLista = null;
    //Aqui adcionarei um contador de elementos
    this.qtd = 0;
    this.playersNames = [];
    this.invertido = false;
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
    let array = [1, 3, 9, 12];
    let rng = parseInt(Math.random() * (4 - 0) + 0);
    return array[rng];
  }

  executaCarta(carta, ptAtual) {
    switch (carta) {
      case 1:
        this.addtext(`\nPula o próximo Jogador`);
        return this.carta1(ptAtual);
        break;
      case 12:
        this.addtext(`\nInverte o Jogo`);
        return this.carta12(ptAnterior, ptAtual);
        break;
      case 3:
        this.addtext(`\nElimina o Terceiro Jogador Seguinte`);
        return this.carta3(ptAtual);
        break;
      case 9:
        this.addtext(`\nElimina o Jogador Anterior`);
        return this.carta9(ptAnterior, ptAtual);
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

  rodada() {
    let ptAux = this.ptLista;
    console.log(ptAux);
    let ptAux2 = ptAux;
    console.log(ptAux2);
    let qtd = 0;

    //Pega o anterior do primeiro da lista posso tornar uma funcao ?
    while (ptAux2.proxNodo.chave != this.ptLista.chave) {
      ptAux2 = ptAux2.proxNodo;
    }
    let ptAnterior = ptAux2;

    let cont = 1;
    while (this.qtd > 1) {
      this.addtext(`\n<Rodada ${cont}>\n`);
      let i = 1;
      let qtdRod = this.qtd;
      while (ptAux.chave != this.ptLista && this.qtd >= 1) {
        this.addtext(`\n<Jogada ${i}>`);
        this.addtext(`\nA vez do Jogador ${ptAux.chave}:`);
        confirm(
          "A vez é de: " +
            ptAux.chave +
            "\nPressione Ok para retirar uma carta."
        );

        let obj = this.executaCarta(this.tiraCarta(), ptAnterior, ptAux);
        this.addtext(`\nTirou a Carta ${obj.carta}:`);
        if (obj != null) {
          ptAnterior = obj.ant;
          ptAux = obj.fa;
        } else {
          ptAnterior = ptAux;
          ptAux = ptAux.proxNodo;
        }
        this.addtext(`\n</Jogada ${i}>\n`);
        i++;
        this.mostraJogadores();
      }
      this.addtext(`\n</Rodada ${cont}>\n`);
      cont++;
    }
    this.addtext(`\nVencedor é ${ptAux.chave}`);
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
    /*
    let anterior;
    
    futuroAtual = ptAtual.proxNodo.proxNodo;
    anterior = ptAtual.proxNodo;
    confirm(
      "Carta 2: Pula o jogador seguinte." +
        "\nO jogador(a) " +
        anterior.chave +
        " será pulado(a)."
    );
    return { fa: futuroAtual, ant: anterior, carta: 1 };*/
  }
  // Elimina o jogador atual
  carta12(ptAnterior, ptAtual) {
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
    return { fa: ptAtual.proxNodo, ant: ptAnterior, carta: 12 };
  }

  carta3(ptAtual) {
    let futuroAtual = null;
    if (this.invertido) {
      //Codigo Invertido (Anti-Horario)
      futuroAtual = ptAtual.anteNodo;

      if (ptAtual.anteNodo.anteNodo.chave == this.ptLista.chave) {
        this.ptLista = futuroAtual.anteNodo.anteNodo;
      }

      //Se nao, nao muda-se nada e se prossegue com as associacoes
      //Preciso que ponteiro(anteNodo) do nodo proximo aponte para o objeto
      //apontado no (anteNodo) do Nodo a ser removido
      futuroAtual.anteNodo = futuroAtual.anteNodo.anteNodo;
      //Preciso que o (anteNodo) do proximo jogador depois do futuroAtual
      //Aponte para o FuturoAtual para manter a lista Duplamente Encadeada
      futuroAtual.anteNodo.proxNodo = futuroAtual;

      return { fa: futuroAtual, carta: 3 };
    } else {
      //Sentido Horario
      //Define o proximo jogador
      futuroAtual = ptAtual.proxNodo;

      //Se o jogador removido for o ponteiro da Lista jogamos o ponteiro pra frente.
      if (ptAtual.proxNodo.proxNodo.chave == this.ptLista.chave) {
        this.ptLista = futuroAtual.proxNodo.proxNodo;
      }

      //Se nao, nao muda-se nada e se prossegue com as associacoes
      //Preciso que ponteiro(proxNodo) do nodo proximo aponte para o objeto
      //apontado no (proxNodo) do Nodo a ser removido
      futuroAtual.proxNodo = futuroAtual.proxNodo.proxNodo;
      //Preciso que o (anteNodo) do proximo jogador depois do futuroAtual
      //Aponte para o FuturoAtual para manter a lista Duplamente Encadeada
      futuroAtual.proxNodo.anteNodo = futuroAtual;

      return { fa: futuroAtual, carta: 3 };
    }
    /*
    
    let anterior;
    let anteriorRemovido;
    let removido;
    //Aqui define o curso normal do jogo
    futuroAtual = ptAtual.proxNodo;
    anterior = ptAtual;
    //Aqui define as sobreposicoes de remover o terceiro

    anteriorRemovido = futuroAtual;
    removido = anteriorRemovido.proxNodo;
    if (removido.chave == this.ptLista.chave) {
      this.ptLista = removido.proxNodo;
    }
    anteriorRemovido.proxNodo = removido.proxNodo;
    //Aqui remove 1 da rodada
    this.qtd--;
    this.removeVetor(this.buscaLinear(removido.chave));
    confirm(
      "Carta 5: Remova o terceiro jogador seguinte, a partir do jogador atual." +
        "\nO jogador(a) " +
        removido.chave +
        " foi removido(a)."
    );
    return { fa: futuroAtual, ant: anterior, carta: 3 }; */
  }

  carta9(ptAnterior, ptAtual) {
    let antDoAnt;
    let ptaux1 = ptAtual;
    //Aqui pega o anterior do anterior para remover
    while (ptaux1.proxNodo.chave != ptAnterior.chave) {
      ptaux1 = ptaux1.proxNodo;
    }
    if (ptAnterior.chave == this.ptLista.chave) {
      this.ptLista = ptAtual;
    }
    //linkar o seu prox nodo ao ptAtual
    antDoAnt = ptaux1;
    this.removeVetor(this.buscaLinear(ptAnterior.chave));
    antDoAnt.proxNodo = ptAtual;
    confirm(
      "Carta 7: Remova o jogador anterior." +
        "\nO jogador(a) " +
        ptAnterior.chave +
        " foi removido(a)."
    );
    this.qtd--;
    return { fa: ptAtual.proxNodo, ant: ptAtual, carta: 9 };
  }

  //OK vou manter
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
      if (this.qtd < 9) {
        //Aqui ocorre o tratamento e duplo encadeamento
        this.Encadeia(ptAux, nodo);
        //Aqui aumenta o tamanho de qtd
        this.qtd++;
      }
      if (this.qtd == 9) {
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

  //Com as funções acima torna-se mais fácil mostrar no console os jogadores restantes
  mostraJogadores() {
    addtext(`\nJogadores restantes: `);
    addtext(`\n${this.playersNames}`);
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
