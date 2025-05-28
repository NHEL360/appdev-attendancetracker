import React, { useState } from 'react';
import {
  IonAlert,
  IonAvatar,
  IonButton,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonToast,
  useIonRouter
} from '@ionic/react';
import { createClient } from '@supabase/supabase-js';
import './Login.css';

const SUPABASE_URL = 'https://vrjwimgpnkarmqswugay.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyandpbWdwbmthcm1xc3d1Z2F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMjIzODQsImV4cCI6MjA2Mzg5ODM4NH0.9qr1KNuozKu0Zo_B9F-Lm0wLBKuqzXOFWvzrpctzvDE';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => (
  <IonAlert isOpen={isOpen} onDidDismiss={onClose} header="Notification" message={message} buttons={['OK']} />
);

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const getIPAddress = async (): Promise<string | null> => {
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      return data.ip;
    } catch {
      return null;
    }
  };

  const doLogin = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setAlertMessage('Please enter both email and password.');
      setShowAlert(true);
      return;
    }

    // Check for lockout
    const { data: recentFailures, error: attemptsError } = await supabase
      .from('login_attempts')
      .select('*')
      .eq('email', normalizedEmail)
      .eq('success', false)
      .order('attempt_time', { ascending: false })
      .limit(5);

    if (attemptsError) {
      console.error('Error fetching login attempts:', attemptsError);
    }

    if (recentFailures && recentFailures.length === 5) {
      const lastFailureTime = new Date(recentFailures[0].attempt_time);
      const now = new Date();
      const diff = now.getTime() - lastFailureTime.getTime();
      const lockDuration = 2 * 60 * 1000; // 2 minutes

      if (diff < lockDuration) {
        const secondsLeft = Math.ceil((lockDuration - diff) / 1000);
        setAlertMessage(`Account locked. Try again in ${secondsLeft} seconds.`);
        setShowAlert(true);
        return;
      }
    }

    // Attempt login
    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password
    });

    const ip = await getIPAddress();
    const { error: insertError } = await supabase.from('login_attempts').insert([
      {
        email: normalizedEmail,
        ip_address: ip || 'unknown',
        success: !error,
        attempt_time: new Date().toISOString()
      }
    ]);

    if (insertError) {
      console.error('Error inserting login attempt:', insertError);
    }

    if (error || !data.session) {
      setAlertMessage('Invalid credentials.');
      setShowAlert(true);
      return;
    }

    setShowToast(true);
    setTimeout(() => {
      navigation.push('/appdev-attendancetracker/app', 'forward', 'replace');
    }, 1500);
  };

  const goToRegister = () => {
    navigation.push('/appdev-attendancetracker/register', 'forward', 'replace');
  };

  return (
    <IonPage>
      <IonContent className="login-background" fullscreen>
        <div className="login-wrapper">
          <div className="login-card">
            <IonAvatar className="login-avatar">
              <img src="https://media.istockphoto.com/id/1268716253/vector/freshman-black-glyph-icon.jpg" alt="Logo" />
            </IonAvatar>

            <h1 className="login-title">Welcome Back</h1>

            <IonInput
              label="Email"
              labelPlacement="floating"
              fill="outline"
              type="email"
              placeholder="Enter Email"
              value={email}
              onIonChange={e => setEmail(e.detail.value!)}
            />

            <IonInput
              label="Password"
              labelPlacement="floating"
              className="login-input"
              fill="outline"
              type="password"
              placeholder="Enter Password"
              value={password}
              onIonChange={e => setPassword(e.detail.value!)}
            >
              <IonInputPasswordToggle slot="end" />
            </IonInput>

            <IonButton onClick={doLogin} expand="block" shape="round" className="login-button">
              Login
            </IonButton>

            <IonButton onClick={goToRegister} expand="block" fill="clear" shape="round" className="register-button">
              Don’t have an account? Register here
            </IonButton>
          </div>
        </div>

        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="primary"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
