import { supabase } from './supabaseClient';

const handleSubmit = async (formData) => {
  const { data, error } = await supabase
    .from('data') // اسم الجدول عندك في Supabase هو data
    .insert([
      { 
        Full_Name: formData.fullName,          // الاسم الكامل
        Filiere: formData.filiere,              // الشعبة
        musical_instrument: formData.instrument,// الآلة الموسيقية
        Niveau: formData.niveau,                // المستوى
        Telephone: formData.phone               // رقم الهاتف
      }
    ]);

  if (error) {
    console.error('حدث خطأ:', error.message);
  } else {
    console.log('تمت إضافة الطالب بنجاح:', data);
  }
};