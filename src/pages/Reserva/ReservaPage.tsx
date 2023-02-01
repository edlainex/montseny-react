import { useState } from "react";

interface Quarto {
  id: number,
  nome: string,
  descricao: string,
  valor: number,
  imgUrl: string
}

interface Reserva {
  checkIn: string;
	checkOut: string;
	quantidadeDePessoas: number;
	quarto: Quarto;
	servicos: [];
	totalDeDias: number;
	total: number;
}

const quartos: Quarto[] = [
	{
		id: 1,
		nome: "Ofurô",
		descricao:
			"Delicie-se com um banho aromático de ofurô com privacidade e aconchego, escolha uma de nossas cabanas! Feitas de madeira, com varanda e vista para o bosque, são equipadas com tudo o que você precisa para relaxar em grande estilo.",
		valor: 200,
		imgUrl: "src/assets/images/quarto_ofuro.webp",
	},
	{
		id: 2,
		nome: "Master",
		descricao:
			"O Chalé Master, com aproximadamente 50m² de requinte e aconchego, oferece quarto e hall de entrada totalmente integrados e separados da área externa. Possui uma vista única que proporcionará uma experiência inesquecível, um banheiro e lareira para os dias de frio.",
		valor: 200,
		imgUrl: "src/assets/images/quarto_master.webp"
	},
	{
		id: 3,
		nome: "Luxo Família",
		descricao:
			"O Chalé Luxo Família é ideal para famílias de até 4 pessoas. Possui uma encantadora vista do vale e do lago e uma aconchegante lareira para os dias de frio. Conta com uma linda área externa e varanda privativa.",
		valor: 200,
		imgUrl: "src/assets/images/quarto_familia.webp"
	},
];

export function ReservaPage() {
  const [reserva, setReserva] = useState<Reserva>({
    checkIn: "",
    checkOut: "",
    quantidadeDePessoas: 0,
    quarto: {
      id: 0,
      nome: "",
      descricao: "",
      imgUrl: "",
      valor: 0
    },
    servicos: [],
    totalDeDias: 0,
    total: 0,
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name === "quarto") {
      const quarto = quartos.find(el => el.id === Number(event.target.value))!;

      setReserva({
        ...reserva,
        [event.target.name]: quarto,
      })
      console.log("reserva:", reserva)

      return;
    }

    setReserva({
			...reserva,
			[event.target.name]: event.target.value,
		});

    console.log("reserva:", reserva)
  }

	return (
		<>
			<section>
				<h2>Minha Reserva</h2>
				<form id="formularioReserva">
					<fieldset>
						<legend>Datas</legend>
						<div>
							<label htmlFor="checkIn">Check in</label>
							<input
								type="date"
								id="checkIn"
								name="checkIn"
								defaultValue={""}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label htmlFor="checkOut">Check out</label>
							<input
								type="date"
								id="checkOut"
								name="checkOut"
								defaultValue={""}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label htmlFor="quantidadeDePessoas">
								Quantidade de pessoas
							</label>
							<input
								type="number"
								id="quantidadeDePessoas"
								name="quantidadeDePessoas"
								min={1}
								max={4}
								defaultValue={1}
								onChange={handleChange}
							/>
						</div>
					</fieldset>
					<fieldset>
						<legend>Quartos</legend>
						<div role="radiogroup">
							{quartos.map((quarto) => (
								<div key={quarto.id}>
									<img
										src={quarto.imgUrl}
										alt=""
									/>
									<div>
										<strong>{quarto.nome}</strong>
										<p>{quarto.descricao}</p>
										<strong>{quarto.valor}</strong>
									</div>
									<div>
										<input
											type="radio"
											id={quarto.nome.toLowerCase()}
											name="quarto"
											value={quarto.id}
											onChange={handleChange}
										/>
										<label
											htmlFor={quarto.nome.toLowerCase()}
										>
											{quarto.nome}
										</label>
									</div>
								</div>
							))}
						</div>
					</fieldset>
				</form>
			</section>
			<div>
				<h3>Resumo da reserva</h3>
				<div>
					<span>
						Apartamento:{" "}
						<strong>
							{reserva.quarto ? reserva.quarto.nome : ""}
						</strong>
					</span>
				</div>
				<div>
					<span>
						Check-in:{" "}
						<strong>
							{reserva.checkIn ? reserva.checkIn : ""}
						</strong>
					</span>
				</div>
				<div>
					<span>
						Check out:{" "}
						<strong>
							{reserva.checkOut ? reserva.checkOut : ""}
						</strong>
					</span>
				</div>
				<div>
					<span>
						Quantidade de pessoas:{" "}
						<strong>
							{reserva.quantidadeDePessoas
								? reserva.quantidadeDePessoas
								: ""}
						</strong>
					</span>
				</div>
			</div>
		</>
	);
}