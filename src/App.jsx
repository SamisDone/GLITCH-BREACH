import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Zap, Trophy, Heart, Flame } from 'lucide-react';
// Add this RIGHT AFTER the imports
const storage = {
  async get(key) {
    const value = localStorage.getItem(key);
    return value ? { key, value } : null;
  },
  async set(key, value) {
    localStorage.setItem(key, value);
    return { key, value };
  },
  async list(prefix) {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(prefix));
    return { keys, prefix };
  }
};
const COMMANDS = {
  easy: [
    { typo: "accses", correct: "access" },
    { typo: "conect", correct: "connect" },
    { typo: "donwload", correct: "download" },
    { typo: "execte", correct: "execute" },
    { typo: "fiewrall", correct: "firewall" },
    { typo: "pasword", correct: "password" },
    { typo: "scaner", correct: "scanner" },
    { typo: "encript", correct: "encrypt" },
    { typo: "decript", correct: "decrypt" },
    { typo: "sevrer", correct: "server" },
    { typo: "logn", correct: "login" },
    { typo: "logot", correct: "logout" },
    { typo: "updat", correct: "update" },
    { typo: "delet", correct: "delete" },
    { typo: "instll", correct: "install" },
    { typo: "seach", correct: "search" },
    { typo: "procss", correct: "process" },
    { typo: "memroy", correct: "memory" },
    { typo: "kernal", correct: "kernel" },
    { typo: "rebot", correct: "reboot" },
    { typo: "bakup", correct: "backup" },
    { typo: "restroe", correct: "restore" },
    { typo: "complie", correct: "compile" },
    { typo: "debg", correct: "debug" },
    { typo: "cofig", correct: "config" },
    { typo: "lauch", correct: "launch" },
    { typo: "shutdwn", correct: "shutdown" },
    { typo: "refesh", correct: "refresh" },
    { typo: "uplosd", correct: "upload" },
    { typo: "verfiy", correct: "verify" },
    { typo: "cansel", correct: "cancel" },
    { typo: "exprt", correct: "export" },
    { typo: "imprt", correct: "import" },
    { typo: "syncr", correct: "sync" },
    { typo: "systm", correct: "system" }
  ],
  medium: [
    { typo: "init_systme", correct: "init_system" },
    { typo: "byapss_scurity", correct: "bypass_security" },
    { typo: "laod_datbase", correct: "load_database" },
    { typo: "run_expoit", correct: "run_exploit" },
    { typo: "creat_backdor", correct: "create_backdoor" },
    { typo: "scan_netwrok", correct: "scan_network" },
    { typo: "injcet_code", correct: "inject_code" },
    { typo: "grabt_token", correct: "grant_token" },
    { typo: "elevaet_privs", correct: "elevate_privs" },
    { typo: "brutefoce_auth", correct: "bruteforce_auth" },
    { typo: "fetch_credentals", correct: "fetch_credentials" },
    { typo: "prase_pakcet", correct: "parse_packet" },
    { typo: "verfiy_signture", correct: "verify_signature" },
    { typo: "excute_paylaod", correct: "execute_payload" },
    { typo: "termnate_procss", correct: "terminate_process" },
    { typo: "montor_trafic", correct: "monitor_traffic" },
    { typo: "spoof_adress", correct: "spoof_address" },
    { typo: "hidde_tracke", correct: "hide_tracker" },
    { typo: "dumpf_memry", correct: "dump_memory" },
    { typo: "enabel_debuger", correct: "enable_debugger" },
    { typo: "disble_loggin", correct: "disable_logging" },
    { typo: "actvate_modul", correct: "activate_module" },
    { typo: "genarate_key", correct: "generate_key" },
    { typo: "valdiate_input", correct: "validate_input" },
    { typo: "refctor_cod", correct: "refactor_code" },
    { typo: "optmize_query", correct: "optimize_query" },
    { typo: "migrte_schem", correct: "migrate_schema" },
    { typo: "depoly_servce", correct: "deploy_service" },
    { typo: "rollbck_verson", correct: "rollback_version" },
    { typo: "confgure_route", correct: "configure_router" },
    { typo: "analize_log", correct: "analyze_logs" },
    { typo: "sanitze_dat", correct: "sanitize_data" },
    { typo: "authnticate_usr", correct: "authenticate_user" },
    { typo: "initilize_sessio", correct: "initialize_session" },
    { typo: "hook_functio", correct: "hook_function" }
  ],
  hard: [
    { typo: "dlete_usr_fles", correct: "delete_user_files" },
    { typo: "expot_sensetive_dta", correct: "export_sensitive_data" },
    { typo: "overide_secruity_protocl", correct: "override_security_protocol" },
    { typo: "establsh_remot_conection", correct: "establish_remote_connection" },
    { typo: "comprmise_admin_accunt", correct: "compromise_admin_account" },
    { typo: "disabl_intrusn_detction", correct: "disable_intrusion_detection" },
    { typo: "extarct_encryptd_payload", correct: "extract_encrypted_payload" },
    { typo: "manipulte_permision_flags", correct: "manipulate_permission_flags" },
    { typo: "intecept_netwrk_trafic", correct: "intercept_network_traffic" },
    { typo: "reverese_enginer_binary", correct: "reverse_engineer_binary" },
    { typo: "authnticate_previleged_usr", correct: "authenticate_privileged_user" },
    { typo: "dencrypt_confidental_archve", correct: "decrypt_confidential_archive" },
    { typo: "escalte_operatin_permisions", correct: "escalate_operating_permissions" },
    { typo: "initalize_backdor_listner", correct: "initialize_backdoor_listener" },
    { typo: "exfiltarte_database_recordz", correct: "exfiltrate_database_records" },
    { typo: "obfusacte_malicous_scritp", correct: "obfuscate_malicious_script" },
    { typo: "complie_shllcode_injectio", correct: "compile_shellcode_injection" },
    { typo: "neutralze_antivrus_deamon", correct: "neutralize_antivirus_daemon" },
    { typo: "forege_digital_certficate", correct: "forge_digital_certificate" },
    { typo: "reconstuct_fragmeted_packet", correct: "reconstruct_fragmented_packet" },
    { typo: "implemet_crytograhic_algoritm", correct: "implement_cryptographic_algorithm" },
    { typo: "synchornize_distrbuted_systm", correct: "synchronize_distributed_system" },
    { typo: "confgure_loadbalancer_stratgy", correct: "configure_loadbalancer_strategy" },
    { typo: "perpare_enviroment_variabls", correct: "prepare_environment_variables" },
    { typo: "execte_privilged_operatio", correct: "execute_privileged_operation" },
    { typo: "generaet_asymetric_kepar", correct: "generate_asymmetric_keypair" },
    { typo: "analize_vulnerabilty_reprt", correct: "analyze_vulnerability_report" },
    { typo: "initiat_penetraton_testng", correct: "initiate_penetration_testing" },
    { typo: "decomplie_obfuscted_bytcod", correct: "decompile_obfuscated_bytecode" },
    { typo: "establsh_secur_comunication", correct: "establish_secure_communication" },
    { typo: "implemnt_authentcation_floww", correct: "implement_authentication_flow" },
    { typo: "confugure_firwall_rulse", correct: "configure_firewall_rules" },
    { typo: "valdiate_digtial_signatur", correct: "validate_digital_signature" },
    { typo: "perpare_incidnt_respons", correct: "prepare_incident_response" },
    { typo: "optimze_datbase_indxes", correct: "optimize_database_indexes" }
  ]
};

const DIFFICULTY_SETTINGS = {
  easy: { time: 6, points: 100, multiplier: 1 },
  medium: { time: 8, points: 200, multiplier: 1.5 },
  hard: { time: 10, points: 300, multiplier: 2 }
};

export default function TypoHacker() {
  const [gameState, setGameState] = useState('menu');
  const [difficulty, setDifficulty] = useState('easy');
  const [currentCommand, setCurrentCommand] = useState(null);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(10);
  const [combo, setCombo] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [usedCommands, setUsedCommands] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'playing' && timeLeft === 0) {
      handleTimeout();
    }
  }, [timeLeft, gameState]);

  const loadLeaderboard = async () => {
    try {
      const result = await storage.list('glitch_breach:');
      if (result && result.keys) {
        const scores = await Promise.all(
          result.keys.map(async (key) => {
            try {
              const data = await storage.get(key);
              return data ? JSON.parse(data.value) : null;
            } catch {
              return null;
            }
          })
        );
        const validScores = scores.filter(s => s !== null);
        validScores.sort((a, b) => b.score - a.score);
        setLeaderboard(validScores.slice(0, 10));
      }
    } catch (error) {
      console.log('Leaderboard not yet initialized');
    }
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    setCombo(0);
    setUsedCommands([]);
    loadNewCommand();
  };

  const loadNewCommand = () => {
    const availableCommands = COMMANDS[difficulty].filter(
      cmd => !usedCommands.includes(cmd.typo)
    );
    
    if (availableCommands.length === 0) {
      setUsedCommands([]);
      const cmd = COMMANDS[difficulty][Math.floor(Math.random() * COMMANDS[difficulty].length)];
      setCurrentCommand(cmd);
      setUsedCommands([cmd.typo]);
    } else {
      const cmd = availableCommands[Math.floor(Math.random() * availableCommands.length)];
      setCurrentCommand(cmd);
      setUsedCommands([...usedCommands, cmd.typo]);
    }
    
    setInput('');
    setTimeLeft(DIFFICULTY_SETTINGS[difficulty].time);
    setFeedback('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleTimeout = () => {
    setLives(lives - 1);
    setCombo(0);
    setFeedback('TIME OUT!');
    
    if (lives - 1 <= 0) {
      endGame();
    } else {
      setTimeout(() => loadNewCommand(), 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      checkAnswer();
    }
  };

  const checkAnswer = () => {
    if (input.toLowerCase().trim() === currentCommand.correct.toLowerCase()) {
      const timeBonus = Math.floor(timeLeft * 10);
      const comboMultiplier = 1 + (combo * 0.1);
      const points = Math.floor(
        (DIFFICULTY_SETTINGS[difficulty].points + timeBonus) * 
        DIFFICULTY_SETTINGS[difficulty].multiplier * 
        comboMultiplier
      );
      
      setScore(score + points);
      setCombo(combo + 1);
      setFeedback(`+${points} POINTS!`);
      
      setTimeout(() => loadNewCommand(), 800);
    } else {
      setLives(lives - 1);
      setCombo(0);
      setFeedback('INCORRECT!');
      
      if (lives - 1 <= 0) {
        endGame();
      } else {
        setTimeout(() => loadNewCommand(), 1500);
      }
    }
  };

  const endGame = async () => {
    setGameState('gameover');
    
    if (playerName.trim()) {
      try {
        const timestamp = Date.now();
        const entry = {
          name: playerName.trim().slice(0, 20),
          score: score,
          difficulty: difficulty,
          timestamp: timestamp
        };
        
        await storage.set(
          `typo_hacker:${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
          JSON.stringify(entry),
        );
        
        await loadLeaderboard();
      } catch (error) {
        console.error('Error saving score:', error);
      }
    }
  };

  const renderMenu = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 p-8">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Terminal size={48} className="text-green-500" />
          <h1 className="text-6xl font-bold font-mono text-green-500 animate-pulse">
            GLITCH BREACH
          </h1>
        </div>
        
        <p className="text-xl font-mono text-green-300">
          &gt; BREACH THE SYSTEM. FIX THE GLITCHES. BEAT THE CLOCK.
        </p>
        
        <div className="bg-gray-900 border-2 border-green-500 p-6 rounded-lg">
          <h2 className="text-2xl font-mono mb-4 text-green-400">SELECT DIFFICULTY</h2>
          <div className="space-y-3">
            {['easy', 'medium', 'hard'].map(diff => (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={`w-full py-3 px-6 font-mono text-lg border-2 rounded transition-all ${
                  difficulty === diff
                    ? 'bg-green-500 text-black border-green-400'
                    : 'bg-gray-800 text-green-400 border-green-700 hover:border-green-500'
                }`}
              >
                {diff.toUpperCase()} - {DIFFICULTY_SETTINGS[diff].time}s - {DIFFICULTY_SETTINGS[diff].points} pts
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border-2 border-green-500 p-6 rounded-lg">
          <input
            type="text"
            placeholder="Enter alias..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength={20}
            className="w-full px-4 py-3 bg-black border-2 border-green-700 text-green-400 font-mono text-lg focus:outline-none focus:border-green-500"
          />
        </div>

        <button
          onClick={startGame}
          disabled={!playerName.trim()}
          className="w-full py-4 px-8 bg-green-500 text-black font-mono text-2xl font-bold border-2 border-green-400 rounded hover:bg-green-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &gt; INITIATE_
        </button>

        {leaderboard.length > 0 && (
          <div className="bg-gray-900 border-2 border-green-500 p-6 rounded-lg mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="text-yellow-500" size={24} />
              <h2 className="text-2xl font-mono text-green-400">TOP HACKERS</h2>
            </div>
            <div className="space-y-2">
              {leaderboard.map((entry, idx) => (
                <div key={idx} className="flex justify-between items-center text-green-300 font-mono">
                  <span className="flex items-center gap-3">
                    <span className="text-yellow-500 w-6">{idx + 1}.</span>
                    <span>{entry.name}</span>
                    <span className="text-xs text-gray-500 uppercase">({entry.difficulty})</span>
                  </span>
                  <span className="text-green-400 font-bold">{entry.score}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderGame = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 p-8">
      <div className="w-full max-w-3xl space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="text-yellow-500" size={20} />
              <span className="font-mono text-2xl font-bold">{score}</span>
            </div>
            {combo > 0 && (
              <div className="flex items-center gap-2 bg-orange-900 px-3 py-1 rounded border border-orange-500">
                <Flame className="text-orange-500" size={20} />
                <span className="font-mono text-lg text-orange-400">x{combo}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                size={24}
                className={i < lives ? 'text-red-500 fill-red-500' : 'text-gray-700'}
              />
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border-2 border-green-500 p-8 rounded-lg">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-sm text-gray-400">TIME REMAINING</span>
              <span className={`font-mono text-2xl font-bold ${timeLeft <= 3 ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="w-full bg-gray-800 h-2 rounded overflow-hidden">
              <div
                className={`h-full transition-all ${timeLeft <= 3 ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: `${(timeLeft / DIFFICULTY_SETTINGS[difficulty].time) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-6">
            <p className="font-mono text-sm text-gray-400 mb-2">&gt; CORRUPTED COMMAND DETECTED:</p>
            <div className="bg-black border-2 border-red-500 p-4 rounded">
              <p className="font-mono text-3xl text-red-400 tracking-wider">
                {currentCommand?.typo}
              </p>
            </div>
          </div>

          <div>
            <p className="font-mono text-sm text-gray-400 mb-2">&gt; ENTER CORRECT COMMAND:</p>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-4 bg-black border-2 border-green-500 text-green-400 font-mono text-2xl focus:outline-none focus:border-green-300"
              autoFocus
            />
          </div>

          {feedback && (
            <div className={`mt-4 text-center font-mono text-2xl font-bold ${
              feedback.includes('POINTS') ? 'text-green-400' : 'text-red-500'
            }`}>
              {feedback}
            </div>
          )}
        </div>

        <p className="text-center font-mono text-sm text-gray-500">
          DIFFICULTY: {difficulty.toUpperCase()} | PRESS ENTER TO SUBMIT
        </p>
      </div>
    </div>
  );

  const renderGameOver = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 p-8">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-6xl font-bold font-mono text-red-500 mb-8">
          SYSTEM BREACH FAILED
        </h1>
        
        <div className="bg-gray-900 border-2 border-green-500 p-8 rounded-lg">
          <div className="space-y-4">
            <div>
              <p className="font-mono text-gray-400">HACKER:</p>
              <p className="font-mono text-2xl text-green-400">{playerName}</p>
            </div>
            <div>
              <p className="font-mono text-gray-400">FINAL SCORE:</p>
              <p className="font-mono text-5xl text-green-500 font-bold">{score}</p>
            </div>
            <div>
              <p className="font-mono text-gray-400">DIFFICULTY:</p>
              <p className="font-mono text-xl text-green-400">{difficulty.toUpperCase()}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setGameState('menu')}
          className="w-full py-4 px-8 bg-green-500 text-black font-mono text-2xl font-bold border-2 border-green-400 rounded hover:bg-green-400 transition-all"
        >
          &gt; RETURN TO TERMINAL_
        </button>
      </div>
    </div>
  );

  if (gameState === 'menu') return renderMenu();
  if (gameState === 'playing') return renderGame();
  if (gameState === 'gameover') return renderGameOver();
}
