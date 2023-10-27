import { ref } from 'vue'
import { defineStore } from 'pinia'
import { handleTalentWorkDetails,handleTalentPortfolio,handleBusinessDetails,handleBusinessPortfolio } from "@/services/Onboarding"


export const useOnboardingStore = defineStore('onBoardingStore', () => {
    const step =ref(1);
    const skill_title = ref('');
    const overview = ref('')
    const location = ref('')
    const employment_type = ref('')
    const highest_education = ref('')
    const rate = ref('')
    const availability = ref('')

    const top_skills= ref([]);
    const education = ref({
      school_name: '',
      degree: '',
      field_of_study: '',
      start_date: '',
      end_date: '',
      description: '',
      currently_schooling_here: 'no'
    })
    const employment_details = ref({
      company_name: '',
      title: '',
      employment_type: '',
      start_date: '',
      end_date: '',
      description: '',
      currently_working_here: 'no',
    })
    const certificate =ref( {
        title: "",
        institute: "",
        certificate_date: "",
        certificate_year: "",
        certificate_link: "",
        currently_working_here: "no"
    });
const portfolio = ref({
  title: '',
  client_name: '',
  job_type: '',
  location: '',
  rate: '',
  tags: [],
  cover_image: null,
  body: '',
  max:'',
  min:''
})
const portfolioRate = ref(`${portfolio.value.min} ${portfolio.value.max}`)
    const submitTalentPortfolio = async() => {
            let payload = {
              portfolio: {
                title: portfolio.value.title,
                client_name: portfolio.value.client_name,
                job_type: portfolio.value.job_type,
                location: portfolio.value.location,
                rate: String(`${portfolio.value.min}-${portfolio.value.max}`),
                tags: portfolio.value.tags,
                cover_image: portfolio.value.cover_image,
                body: portfolio.value.body
              }
            }

          handleTalentPortfolio(payload)
    }
    const submitBusinessPortfolio = async(payload) => {
          handleBusinessPortfolio(payload)
    }
    const submitTalentWorkDetails = async() => {
      let payload = {
        skill_title: skill_title.value,
        overview: overview.value,
        location: location.value,
        employment_type: employment_type.value,
        highest_education: highest_education.value,
        rate: rate.value,
        top_skills: top_skills.value,
        education: {
          school_name: education.value.school_name,
          degree: education.value.degree,
          // field_of_study: education.value.field_of_study,
          description: education.value.description,
          start_date: education.value.start_date,
          end_date: education.value.end_date,
          currently_schooling_here: education.value.currently_schooling_here
        },
        employment_details: {
          company_name: employment_details.value.company_name,
          title: employment_details.value.title,
          employment_type: employment_details.value.employment_type,
          description: employment_details.value.description,
          start_date: employment_details.value.start_date,
          end_date: employment_details.value.end_date,
          currently_working_here: employment_details.value.currently_working_here
        },
        certificate: {
          title: certificate.value.title,
          institute: certificate.value.institute,
          certificate_date: certificate.value.certificate_date,
          certificate_year: certificate.value.certificate_year,
          certificate_link: certificate.value.certificate_link,
          currently_working_here: certificate.value.currently_working_here
        },
        availability: availability.value
      }
          handleTalentWorkDetails(payload)
    }
    const submitBusinessDetails = async(payload) => {
          handleBusinessDetails(payload)
    }

    return {
      submitTalentPortfolio,
      submitBusinessPortfolio,
      submitTalentWorkDetails,
      submitBusinessDetails,
      step,
      skill_title,
      overview,
      location,
      employment_type,
      highest_education,
      rate,
      top_skills,
      education,
      employment_details,
      certificate,
      availability,
      portfolio,
      portfolioRate
    }
})