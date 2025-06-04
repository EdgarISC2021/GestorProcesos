import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/users/api/login/', {
        username,
        password
      });

      const token = response.data.key || response.data.token;
      
      if (token) {
        localStorage.setItem('authToken', token);
        navigate('/inicio');
      } else {
        setError('Error en la autenticación. Intente nuevamente.');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setError('Usuario o contraseña incorrectos');
        } else {
          setError('Error en el servidor. Intente más tarde.');
        }
      } else {
        setError('Error de conexión. Verifique su red.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        {/* Logo estratégicamente colocado */}
        <div style={styles.logoContainer}>
          <img 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAABnCAMAAAAjWM70AAAAn1BMVEX////ynBOOlJT74LWxtbX62qacoaH4+PjzoiHq6+uip6fj5OT4x3qqrq71tE3N0NC/w8P85sT98+Hx8vLc3d2Vmpq4vLzU19f51JfGycn4zYn97dT++/b1sUSlqqr2u13+9+z0qDD2uVjzpiz98d/3wm30rDn86Mj74LT1sUb3v2b616D4y4P50pSppp3QrHXCrIvKrX/jokHWqGG3rJaWyMrVAAANMElEQVR4nO2ch5aiwBJAEZAogpJEEXPY0dkX///bXlVngo7O6IR9W+fsLNh0d93qqk4ETft8if0wMitLR0krM8rdL1DiqRInUZACnRVERZ74LoifhFmQJV+t2cMkzjMPCL2so/Xs0AztL9Dp0eJHBDFKLsK45g9vUTvP0FGDML5+XZj93Aa1cxO7miC/AcEPfihnQtqxujXu/OoHcrqEMY3uGC9C83nqPEXsEPscvbrFWRUJwifp8xTxaUNmdw/8bvpGP/WNJCcNmRbvCbQge7g6TxG7wIbUvfx92RP9J0z93IxMVQP/3SWk0QPVeY74AYE0P9IgZvowdZ4jCYW8v9+pSaG/3xM+QZKK9DvZR3vKOPzGwZnQzjX6OcPBO8Svbh9B4hjWmH6SJD6I68bNPHmUvTXH/xpxgzchYzcJIzPwLDLYNCS1qiCLwsQFOp9uKhSfp/2N4prXIG0/L0yvg61LMpgEscNvxmlHFyHjpDCtGwGpuBo4f/rPf/0mx99IwrQb0g2z+wiJsTQX/v671+v9xub0L+80fK4kVhekWwRdEchZLK8KgsAkAgdBJQK2gpme/hsoe/+AKYYW4qbK14+hpOdpQMa52YHoBSZu5EGverF9Yhc63xYmVmDeuZR7sBQtSLdo9DVpkBW5f8foEEOm//R6GwudNhPlvLmL9DQh/qpOBvxIDca0ysJ7+Lhgr/37v+AQsOwsKqXAm/aSHi0xqmNKDFdl7NyIvbVgXg5dxvmhjIE0++w4xf61EpW6hWBMg9D/mNVjMtWwlC1bV6J6n7lljZoIPew8EIjFQ8Y6Nw9bzebzqL9r/+xDkqfQ83CVMmbo5/f8ccjsaX6G72JU8qDMq8/tCG1GWj39LkSScn+N6ZaP/rnDWsy2RZ8KasNQRkdKtuXzFUM3DRTveaCup3ukB6BbPp/a76lik2ipnhSjOa6UNLYb8nldXqf4WX3gfpxkOLdmW83VOzdhHShxBL4bPdqfYtqEZKT+4NbdowT3vdPH2tuXc6533TJ4koSWXj3Q5jmHtL4TJArMOx/muRGH/IZ35cB1rcf0uSZz128IiWJH+gMeWrCD7xeTDYnNDzeoTSeuH75n8FzxvY/dR7PpHPJ7DCHXJPyIjoTywYPTkyTO3t13EMof81BS8s6hBeMy/UGPmNnvu2eIS+if0pRU3Hf0uKGuf9Oh8rLYjfZcTlG217K4xfceRW6RGW7i94yvVuPZ8hfzT5K/mH+StDCXxmlyMsad1/Ynk/6h7C5oPJupmUo47byynBnH0exCIZdkbEDNxvJCccdLOmnbkTGa4UEdszzNe1RW50ah44HDkhYH+et6CNLXljTRWbCCRkNy5fDIrzPwuuFSGy1YKWvFsgNMW4vTJblWpi+ne1bzftLgMXhxePkLZpu0E531sY45WvWkOEoOrTwrKb21aDdS0HTkiKQhWmdQPwXpkzNGT2U+44WQXx1pUJLc56d9R8m0UcNrqxa3KInyA544myuJ86OCOe3V5UXYbvmrnuLwBiUqrFVFVmPtRTndlwpmoxDe1tcwy5dGrqm4buTUEtY1zGNHhRTz3Pp5wSn3zRTO6bTy9PZ1a+0uYvZ6xzcxy3UrE+c8dNQtMLvrQ8xTx+9TRY+6OONLmE3ZXq7Wmb2FubugLFzVXTXFPHSrAjm37HDYn41nE958RMdXdrIzttvDmfchNcz16dhX3Gt1Ph6nK3p8rmOuT4Yx4Xabv4FpsOtejtvxYbqhJxsSB7yZ1xPDmEpvI5jlSqnsVQYpYC56snRNxCm63JKy7Nn8fskqGCmY1MAzAU0UKYcShWM6I+ZxTLHjdUyqLo8QHqcn2V4bljSpYbKzFUs8cr0M3phiBGCcTskzbZYiiXKuJeaZJfBmX6r69kqJ6YilEAv3+VVM1o+ILpl1br803iob0eXzLodg0mbfC405DxuM6kWTsl6hgEHmSoNRFSUMxRzXE0QptDm3ElNakdt1ew2Tssi+FYxDlFpqJc2tjOADiXloWof7psE0UlKE0BJX6k87oTPB3IuEldCQyFkUSjH37UJO1zAd4Q1NoSRr5RcWWgMBtVMZHIa5qVelyKyViXnIlCsifaBhLNp5jwTmWS3EEGpdwqTOMexSqi9sJGQhyluIahuJhkb+m3eVaDQ9h9tywDGl9jR2lnVzSMy+WgilebmC2WFgLq9tkmndbFILmcgwOw1HMV/bmDuOKU1AHVGcjhqYR7UQ2laLNuasjjnQOmTaxnwVV9POpObrExWzFjt1pg5/O3NMOfkdXMdUZ8kMQrSmVGvEMbfiipZM2t4xaLRmbZF1Zpj7dkMzGbcbmmY63Y25UAuZCFut62oJB+/o/LgchT8JmQvMXdsGQ4a5a5m7T/b8xnwUUi2wIr8c7sasFbJnNfOIHtUL6QvNVdd8JUqVzPaOUh4bRRDz1GoYN4IbzA+VfGxcK7lxFMvRYkgw3YmpOOCrKJ9VIMJiJTBpBM5llFEt98JIckQp9xKTQSnNueCYJW2zOecsqSXRzWaNXAc5Qt2LKVlUbmq2DaM5yuqYvmJBOKZKTqWVdixpyWfJRKs1p2LC116GnAfS3nDEjHNQcu1I9JRsRkGXKPdi9tZkUB3zlYeyg9FbExPzVSSxKrtsTtQo2QKbuBybDfT2xxJTNrz8gawXToiOW7GYQ24+kXeGL2ueizrFlk999+uFmO7TEeZuTFKIWFCwwWLFal6cd6J8gslhepv1y5Afn1V3AFmtZOGsRLFY2i8WylrZUGGksEVl11KcdZrvwFSER91rR1pfKaEzU9dSlGO29wGIEC9uLcfFVkh7yT0sH4AplhBlh1b9CxZe8YGnXDTVlZjadtPMJzC1bb22lTKRP9ZNwCP/Tsx6+euluLCm1UnF1EZ1hYcyU2NX53WvYGrjeT2bgqmVr5LGOddmS2Nlb2AuR7L7MLcTWf6qPsEV3cRm1NjZW8p9wt6mNo/SDnL3xulrNUzoU2Vde6OxHV0ed3vH2ex3/dbyZ/y6XkHS8Kws8jQDRd42nJFzcbokp0uBOYY+cbffOM5819rnPwx+QfHDSamVJJcyV1ueFqDU6tfAaCm1fV3MV/tfL6juCLMpHggs843z9Q+A3aXQ5KnCMf9w+Yv5J8lfzD9J/mL+SVKOUb5ai/8bceuPRSXhJzyjN144vX1t+uaHYeOFcbfr8Tv7jldffS4xPuJmBWpapuvBpXxSgysf3HLfzs7vW8mtUddrP2Ruel2l6zc/82qL12YjoGpgpjdoqZnW5bTshs/gwBprN5sre+BeCk3pVrVvHXRixne8Iuq6bqJn8DdWMG36bRCdPktNXMN2uYfE/MAlFzFMu+5A9KHAFia5KHZVjzzi2mYhMWP6zYqYVm6zShqYcdx1HDdVtNVvnLASOaZp4isYBb6Pr+u+GQT4pYWKv/yLrxjjI/P4vh8+Do6P+Oe+XsBfAmzjc5p4eVqQlxxCX8dsGaRZkQVBQF43V57RXjo9Z6osnWwWKBh44q1txCRa5jqc5RZRhjgtFocvyto6vmROHuZHFT1U0azV1MTUq8QPdN/2ddOHS72w0CzPjxMrxWqg5QNwqEJPYt/yIPxSP/ahpigWmHEKl0d6ztIEpm6GeawHbpzrSkCTZfFqKc4jPc1YD+SleZykXgMz0U0XDBkjpg/FuRE0CkRf5JJrQzigKqagYlpdxIwxvENaMDmLybu9hW5rFuay00wzU9DEz6nT+qQEgRmSuDIL4rQKJrqwT97MC4QTsk2OrXYSK2jy8im+e5qQPgb/1jADrCeuEsQkamhBCvWaxEQaDTyiosVU7MYUvkcwaXjZfgguZ8d6VYBAKyb8ixIUM1ExxQe4GpjUG2M/zFLRb+3ontx8qm4ck89fhMSuGlGjhpmyr9IhZkrcAuxqk5AOUcWAqZjXP3pxHdOijqRbZqDbrm55KHBZgu/7RRzTVzEDDtHARJUwYKzM41fgDbED219+ZVag/1kWaRsQbBgVk6lLMOlLpDmEGHl2O5QqmlLFWzFz8okKMC61mWbTfxjBTUz0dtrBJomCaXLMSMfXdoUhcHempHc+2I3DQo+5NvQQ6ySYGeHgrRm6iEk9BH4VmHFbxVsxaX0e/PXQ32NwFQ+DNAGETGBm6GMhiU0kAyrEdLFaO+WYAZogTrlbY2v+2pHWpA+ewPXkg60x9B0+c8SEYJJRPAAdSDyCOREzo5pZmsDsUPFWzEQPkrxKoWfxoeMNLTgIdTMPLSgxgv6YYiZ6BVGHGb20yCv4rdDNBHoeiBSBWehZEloCkz/2MNwITuhpzchMUx/7vyyPcIBBzEzPwiAFLDcFHVLLRsw4tUKoKlEwE6JiqqjYwszgqECfsIOEflC0oB7ipVXo4m++aVnkA4GAbWWkF/YgxWVXBeRryHZkpfipREyD2SBolUMxGfEmQA7yJBDD2WnVc4Z97bB42bHb2IlppR59DY3Uq1EtoFAr8wMcBkAHSI9RnzgDfXymsJagJwgVQ6Yiw2TfRy2C/wEm4N6avAoNjAAAAABJRU5ErkJggg==" 
            alt="Logo de la empresa" 
            style={styles.logo}
          />
        </div>

        <h2 style={styles.title}>Inicio de Sesión</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={loading ? styles.buttonDisabled : styles.button}
          >
            {loading ? (
              <span style={styles.buttonText}>
                <span style={styles.spinner}></span> Cargando...
              </span>
            ) : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Estilos modernos y profesionales
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '20px',
  },
  loginBox: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    textAlign: 'center',
  },
  logoContainer: {
    marginBottom: '10px',
  },
  logo: {
    maxWidth: '250px',
    height: 'auto',
  },
  title: {
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '24px',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  label: {
    marginBottom: '8px',
    color: '#2c3e50',
    fontSize: '14px',
    fontWeight: '500',
  },
  input: {
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border 0.3s',
  },
  inputFocus: {
    border: '1px solid #3498db',
    outline: 'none',
  },
  button: {
    padding: '14px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '10px',
  },
  buttonDisabled: {
    padding: '14px',
    backgroundColor: '#bdc3c7',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'not-allowed',
    marginTop: '10px',
  },
  buttonText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  spinner: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '50%',
    borderTopColor: 'white',
    animation: 'spin 1s ease-in-out infinite',
  },
  error: {
    color: '#e74c3c',
    backgroundColor: '#fadbd8',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
  },
  '@keyframes spin': {
    to: { transform: 'rotate(360deg)' },
  },
};

export default LoginForm;