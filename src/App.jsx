import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [cislo, setCislo] = useState(0)
  const [baf, setBaf] = useState("")
  const [pocet, setPocet] = useState(0)
  const [tip, setTip] = useState("")
  const [stav, setStav] = useState("")
  const [vybrano, setVybrano] = useState("")
  const [jmeno, setJmeno] = useState("")
  const [vek, setVek] = useState("")
  const [zobrazProfil, setZobrazProfil] = useState(false)
  const [randomnum, setRandomnum] = useState(() => Math.floor(Math.random() * 10) + 1);
  const [showPfpSettings, setShowpfpSettings] = useState(false)
  const savedAvatar = localStorage.getItem("avatar");
  const [joke, setJoke] = useState("");
  const [funfact, setFunfact]  = useState("")
  const [datum, setDatum] = useState("")
  const avatarOptions = [
    "https://i.pinimg.com/736x/60/c7/03/60c7035115e593ec538c2a6513596d1f.jpg",
    "https://i.pinimg.com/736x/8e/89/cd/8e89cd1a992a84ae4c175c90b092e4bb.jpg",
    "https://i.pinimg.com/736x/6b/7f/fc/6b7ffce7da1f2b52b90785af9ef847d3.jpg",
    "https://i.pinimg.com/736x/17/d4/3b/17d43ba18da177e49f14b0588b842942.jpg",
    "https://i.pinimg.com/736x/90/30/40/9030405ab34bc75b1cbe41401cb4a2ea.jpg",
    "https://i.pinimg.com/736x/6d/48/87/6d488761fe7f350cc2dee7a7adbef443.jpg",
    "https://i.pinimg.com/736x/e5/55/40/e555402af290cd801befb31f56adfa79.jpg",
    "https://i.pinimg.com/736x/5b/bc/c0/5bbcc0a4a0c044c6ee9c24a6cb318cea.jpg"
  ];

  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const fetchJoke = async () => {
    try {
      const response = await fetch("https://geek-jokes.sameerkumar.website/api?format=text");
      const data = await response.text();
      setJoke(data);
    } catch (error) {
      setJoke("Nepodařilo se načíst vtip 🥲");
    }
  };
  const fetchFuncact = async () => {
    try {
      const response = await fetch("http://numbersapi.com/random/date");
      const data = await response.text();
      setFunfact(data);
    } catch (error) {
      setJoke("Nepodařilo se načíst funfact :(");
    }
  };


  useEffect(() => {
    const ulozenaData = localStorage.getItem("profilData")
    if (ulozenaData) {
      const data = JSON.parse(ulozenaData)
      setJmeno(data.jmeno)
      setVek(data.vek)
      setVybrano(data.vybrano)
    }
  }, [])

  function checknumber() {
    const usrnum = Number(tip);
    if (usrnum === randomnum) {
      setStav("Správně!");
    } else if (usrnum > randomnum) {
      setStav("Tvé číslo je příliš vysoké");
    } else if (usrnum < randomnum) {
      setStav("Tvé číslo je příliš malé");
    } else {
      setStav("Neplatná odpověď");
    }
  }
  useEffect(() => {
    const now = new Date();
    setDatum(now.toLocaleDateString());
  }, []);


  function handleSubmit() {
    const vekUzivatele = Number(vek)
    if (!jmeno || isNaN(vekUzivatele) || vekUzivatele <= 0 || !vybrano) {
      alert("Vyplň všechna pole správně!")
      return
    }
    const data = { jmeno, vek, vybrano }
    localStorage.setItem("profilData", JSON.stringify(data))
    setZobrazProfil(true)
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          overflow: "hidden",
          cursor: "pointer",
          zIndex: 1000,
          boxShadow: "0 0 5px rgba(0,0,0,0.2)"
        }}
        onClick={() => setZobrazProfil(!zobrazProfil)}
      >
        <img
          src={localStorage.getItem("avatar") || "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="}
          alt="profilovka"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      </div>


      <h1 className='Nadpis'>Ahoj, světe!</h1>
      <p className='Text'>Dnešní datum: {datum}</p>
      <div className='superDiv'>
        <div className='divik'>
          <button onClick={() => {
            if (pocet === 0) {
              setBaf("baf");
            } else {
              setBaf("BAF");
            }
            setPocet(pocet + 1)
          }} className='Cudlik'>Překvápko</button>
          <p id='neco' className='Text'>{baf}</p>
        </div>

        <div className='divik'>
          <div>
            <button onClick={() => setCislo(cislo + 1)} className='Cudlik'>+</button>
            <button onClick={() => setCislo(cislo - 1)} className='Cudlik'>-</button>
          </div>
          <p className='Text'>Počet kliknutí: {cislo}</p>
        </div>
      </div>



      <div className='divik'>
        <h3>Hra hádej číslo!</h3>
        <div>
          <input type="number" value={tip} onChange={(e) => setTip(e.target.value)} />
          <button onClick={checknumber} className='Cudlik'>Submit</button>
        </div>
        <p>{stav}</p>
      </div>

      <div className='divik'>
        <h3>Vytvoř si svůj profil</h3>
        <div>
          <input type="text" placeholder='Zadej své jméno' value={jmeno} onChange={(e) => setJmeno(e.target.value)} />
          <input type="number" placeholder='Zadej svůj věk' value={vek} onChange={(e) => setVek(e.target.value)} />
          <select value={vybrano} onChange={(e) => setVybrano(e.target.value)}>
            <option value="" disabled>Tvůj oblíbený programovací jazyk</option>
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="C">C</option>
            <option value="C#">C#</option>
            <option value="Swift">Swift</option>
            <option value="Kotlin">Kotlin</option>
            <option value="Rust">Rust</option>
            <option value="Assembly">Assembly</option>
            <option value="Lua">Lua</option>
          </select>
          <button onClick={() => setShowpfpSettings(!showPfpSettings)} className='profilovka'>Profilovka</button>
          <button className='Cudlik' onClick={handleSubmit}>Submit</button>
        </div>
      </div>

      {zobrazProfil && (
        <div className='modal'>
          <div className='modal-content'>
            <h2 className='Nadpis'>Tvůj profil</h2>
            <p className='Textik'>Jméno: {jmeno}</p>
            <p className='Textik'>Věk: {vek}</p>
            <p className='Textik'>Tvůj oblíbený programovací jazyk: {vybrano}</p>
            <img src={savedAvatar || "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="} alt="selected avatar" style={{ width: "100px", borderRadius: "50%", height: "100px", objectFit: "cover" }} />
          </div>
        </div>
      )}
      {showPfpSettings && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>Vyber profilovku:</h2>

            <div className="avatar-grid">
              {avatarOptions.map((url) => (
                <button
                  key={url}
                  onClick={() => setSelectedAvatar(url)}
                  style={{
                    border: "none",
                    background: "none",
                    padding: "0",
                    cursor: "pointer"
                  }}
                >
                  <img
                    src={url}
                    alt="avatar"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      objectFit: "cover"
                    }}
                  />
                </button>
              ))}
            </div>

            <div style={{ marginTop: "20px" }}>
              <p>Nebo vlož vlastní URL:</p>
              <input
                type="text"
                placeholder="https://..."
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
              />
              <button onClick={() => setSelectedAvatar(customUrl)} style={{ marginLeft: "10px" }} className='Cudlik'>
                Použít
              </button>
            </div>

            {selectedAvatar && (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <p>Náhled:</p>
                <img src={selectedAvatar} alt="selected avatar" style={{ width: "100px", borderRadius: "50%", height: "100px", objectFit: "cover" }} />
                <br />
                <button
                  onClick={() => {
                    localStorage.setItem("avatar", selectedAvatar);
                    setShowpfpSettings(false);
                  }}
                  style={{ marginTop: "10px" }}
                  className='Cudlik'
                >
                  Uložit a zavřít
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button onClick={fetchJoke} className='Cudlik'>Masivní vtípeček</button>
        {joke && (
          <p className='Text'>{joke}</p>
        )}
      </div>
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button onClick={fetchFuncact} className='Cudlik'>Masivní funfact o náhodném datu</button>
        {funfact && (
          <p className='Text' style={{ marginBottom: "200px", textAlign: "center" }}>{funfact}</p>
        )}
      </div>

    </>
  )
}

export default App
