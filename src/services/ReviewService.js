export default class ReviewService {
  constructor(api) {
    this.api;
  }

  render() {
    this.container = document.createElement('section');
    this.container.className = 'review__form';

    this.stars = document.createElement('div');
    this.stars.className = 'review__stars';
    this.stars.id = 'stars';
    this.container.appendChild(this.stars);

    for (let i = 1; i <= 5; i++) {
      this.star = document.createElement('span');
      this.star.className = `review__star`;
      this.star.dataset.value = i;
      this.star.textContent = '★';
      this.stars.appendChild(this.star);
      this.star.addEventListener('click', () => this.handleStarClick(i));
    }

    this.textarea = document.createElement('textarea');
    this.textarea.className = 'review__textarea';
    this.textarea.placeholder = 'Write your review here';
    this.container.appendChild(this.textarea);

    this.submit = document.createElement('button');
    this.submit.className = 'review__submit';
    this.submit.textContent = 'Submit';
    this.submit.addEventListener('click', () => this.handleSubmit());
    this.container.appendChild(this.submit);

    document.querySelector('.review').appendChild(this.container);
    return this.container;
  }

  handleStarClick(value) {
    this.selectedRating = value;

    const stars = this.stars.querySelectorAll('[data-value]');
    stars.forEach((star) => {
      const starValue = parseInt(star.dataset.value);
      star.classList.toggle('active', starValue <= value);
    });
  }

  getMovieId() {
    const path = window.location.pathname;
    const matches = path.match(/\/movie\/(\d+)/);

    if (!matches || !matches[1]) {
      throw new Error('Movie ID not found in URL');
    }

    return matches[1];
  }

  getUser() {
    return 'guest';
  }

  validateReview() {
    const comment = this.textarea.value.trim();
    if (!this.selectedRating || this.selectedRating < 1) {
      throw new Error('Please select a rating');
    }
    if (!comment) {
      throw new Error('Please write a review');
    }
    return {
      data: {
        comment: comment,
        rating: this.selectedRating,
        author: this.getUser(),
        verified: true,
        movie: this.getMovieId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }

  async handleSubmit() {
    try {
      const reviewData = this.validateReview();

      const movieId = this.getMovieId();
      if (!movieId) throw new Error('Movie ID not found');

      await this.submitReview(reviewData);

      this.resetForm();
      this.showSuccess('Review submitted successfully!');
    } catch (error) {
      this.showError(error.message);
    } finally {
      this.submit.disabled = false;
    }
  }

  async submitReview(reviewData) {
    try {
      const response = await fetch(`/movie/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(reviewData),
      });

      // Logging
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.message || 'Failed to submit review');
      }

      const result = await response.json();
      console.log('Success:', result);
      return result;
    } catch (error) {
      console.error('Submit error:', error);
      throw error;
    }
  }

  resetForm() {
    this.selectedRating = 0;
    this.textarea.value = '';
    this.stars.querySelectorAll('.review__star').forEach((star) => {
      star.classList.remove('active');
    });
  }

  showSuccess(message) {
    const feedback = document.createElement('div');
    feedback.className = 'review__feedback review__feedback--success';
    feedback.textContent = message;
    this.container.appendChild(feedback);
    setTimeout(() => feedback.remove(), 5000);
  }

  showError(message) {
    const feedback = document.createElement('div');
    feedback.className = 'review__feedback review__feedback--error';
    feedback.textContent = message;
    this.container.appendChild(feedback);
    setTimeout(() => feedback.remove(), 5000);
  }
}
