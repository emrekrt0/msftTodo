import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate, Link } from 'react-router-dom';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://jopabase.co',
  'eyJhbGJzdXBhYmFzZSIsInJlZiI6ImpvcHVocmxvZWtrbW95dG51am1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyMzg4OTMsImV4cCI6MjAxODgxNDg5M30.fs4Glk5dtLG80qIyN8fBJGw3jlgwwv4ff6n5B32yJ8E'
);

const SignInForm = () => {
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const formData = Object.fromEntries(new FormData(e.target));
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        alert(error.message);
      } else {
        alert('Başarıyla giriş yaptınız. Anasayfaya yönlendiriliyorsunuz.', data);
        navigate('/');
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error.message);
    }
    await getSession();
    


  };

  async function getSession() {
    const { data: { user } } = await supabase.auth.getUser()
  
    if (user) {
      console.log('Giriş yapan kullanıcının bilgileri:', user);
    }
  }

  return (
    <>
      <div className="signUpBackground">
        <div className='signUpForm'>
          <h2>Giriş Yap</h2>
          <form onSubmit={handleSignIn}>
            <div className="signUpMail">
              <h3>E-posta:</h3>
              <input type="email" name="email" />
            </div>
            <div className="signUpPassword">
              <h3>Şifre:</h3>
              <input type="password" name="password" />
            </div>
            <div className='signIn'>
              <Link to={`/signup`}>Bir hesabın yok mu? <b>Kayıt ol</b></Link>
            </div>
            <button type="submit">Giriş Yap</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
