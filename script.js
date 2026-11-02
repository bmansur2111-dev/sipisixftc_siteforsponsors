// ==========================================================================
// SipiSix #34730 — JavaScript Interactivity
// Handles Modal Dialog & Form Submissions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('contactModal');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const closeModalBtn = document.getElementById('closeModalBtn');

  // Open Modal
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  });

  // Close Modal on Close Button Click
  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // Close Modal when clicking outside the box
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Close Modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
});

// Form Submit Handler
function handleFormSubmit(event) {
  event.preventDefault();

  const company = document.getElementById('companyName').value;
  const email = document.getElementById('email').value;

  alert(`Thank you, ${company}! Your message has been sent. We will contact you at ${email} soon.`);

  // Reset and close modal
  document.getElementById('contactForm').reset();
  document.getElementById('contactModal').classList.remove('active');
}

// Data for the 3 Competition Stories
const storyData = {
  bilim: {
    title: "Bilim Shyny 2026",
    subtitle: "Regional STEM Championship in Astana",
    text1: "Bilim Shyny 2026 was a crucial milestone for SipiSix #34730. Competing against top student teams from across the region, our team demonstrated high autonomous scoring precision and flawless driver-control maneuvering.",
    img1: "Photos from Bilim Shyny Match & Pit Area",
    text2: "Our engineering notebook and autonomous trajectory pathing received high praise from the judges, earning us key recognition and inspiring further mechanical enhancements.",
    img2: "Team Award Ceremony Photo"
  },
  techcup: {
    title: "Almaty TECH Cup XII",
    subtitle: "National Robotics Showdown",
    text1: "At the prestigious Almaty TECH Cup XII (Age of AI), our team deployed advanced OpenCV computer vision pipeline and custom 3D-printed intake mechanisms designed in Fusion 360.",
    img1: "Almaty TECH Cup Robot Inspection & Matches",
    text2: "Battling through intense alliance elimination rounds, SipiSix proven its consistency, defense capabilities, and autonomous Reliability on the FTC game field.",
    img2: "Team & Mentor Celebration at Almaty"
  },
  digitalbridge: {
    title: "Digital Bridge",
    subtitle: "International Innovation & Technology Forum",
    text1: "Digital Bridge served as an extraordinary platform to showcase our robot to tech leaders, government dignitaries, and international sponsors.",
    img1: "Digital Bridge Booth & Robot Live Demo",
    text2: "We presented live robot demonstrations, discussed the future of youth STEM initiatives in Kazakhstan, and established valuable contacts for future season funding.",
    img2: "Exhibition Floor & Public Interaction"
  },
  astanascrimage: {
    title: "astanascrimage",
    subtitle: "International Innovation & Technology Forum",
    text1: "Digital Bridge served as an extraordinary platform to showcase our robot to tech leaders, government dignitaries, and international sponsors.",
    img1: "Digital Bridge Booth & Robot Live Demo",
    text2: "We presented live robot demonstrations, discussed the future of youth STEM initiatives in Kazakhstan, and established valuable contacts for future season funding.",
    img2: "Exhibition Floor & Public Interaction"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Contact Modal Handlers
  const contactModal = document.getElementById('contactModal');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const closeModalBtn = document.getElementById('closeModalBtn');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      contactModal.classList.add('active');
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => contactModal.classList.remove('active'));
  }

  // Story Modal Handlers
  const storyModal = document.getElementById('storyModal');
  const storyModalContent = document.getElementById('storyModalContent');
  const closeStoryModalBtn = document.getElementById('closeStoryModalBtn');
  const storyCards = document.querySelectorAll('.story-card');

  storyCards.forEach(card => {
    card.addEventListener('click', () => {
      const storyKey = card.getAttribute('data-story');
      const data = storyData[storyKey];

      if (data) {
        storyModalContent.innerHTML = `
          <h2>${data.title}</h2>
          <div class="story-subtitle">${data.subtitle}</div>
          <p>${data.text1}</p>
          <div class="story-img-placeholder"><span>[ ${data.img1} ]</span></div>
          <p>${data.text2}</p>
          <div class="story-img-placeholder"><span>[ ${data.img2} ]</span></div>
        `;
        storyModal.classList.add('active');
      }
    });
  });

  if (closeStoryModalBtn) {
    closeStoryModalBtn.addEventListener('click', () => storyModal.classList.remove('active'));
  }

  // Close modals on clicking backdrop
  window.addEventListener('click', (e) => {
    if (e.target === contactModal) contactModal.classList.remove('active');
    if (e.target === storyModal) storyModal.classList.remove('active');
  });
});

function handleFormSubmit(event) {
  event.preventDefault();
  const company = document.getElementById('companyName').value;
  alert(`Thank you, ${company}! Your message has been sent successfully.`);
  document.getElementById('contactForm').reset();
  document.getElementById('contactModal').classList.remove('active');
}

async function handleFormSubmit(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Собираем данные из полей по их точным ID из HTML
    const company = document.getElementById('companyName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value || 'Не указан';
    const message = document.getElementById('message').value;

    // Твои данные бота и чата
    const BOT_TOKEN = "9211215125:AAE15MTJ2xTWz0IDpiXZRydlpYvpgfF0MkI";
    const CHAT_ID = "-1003882821700";

    // Формируем текст сообщения для Telegram
    const text = `🚨 *Новая заявка с сайта SipiSix #34730!*\n\n` +
                 `🏢 *Компания/Имя:* ${company}\n` +
                 `📧 *Email:* ${email}\n` +
                 `📱 *Телефон/Telegram:* ${phone}\n` +
                 `💬 *Сообщение:* \n${message}`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: 'Markdown'
            })
        });

        const data = await response.json();

        if (data.ok) {
            alert('Спасибо! Ваше сообщение успешно отправлено команде SipiSix.');
            
            // Очищаем форму после успешной отправки
            document.getElementById('contactForm').reset();
            
            // Если у тебя модальное окно закрывается автоматически после отправки, 
            // можешь раскомментировать строчку ниже:
            // document.getElementById('contactModal').style.display = 'none';
        } else {
            alert('Ошибка при отправке в Telegram. Проверь консоль.');
            console.error('Telegram Error:', data);
        }
    } catch (error) {
        alert('Ошибка сети. Проверь подключение к интернету.');
        console.error('Network Error:', error);
    }
}