import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  handleTalentWorkDetails,
  handleTalentPortfolio,
  handleBusinessDetails,
  handleBusinessPortfolio,
  verifyIdentity
} from '@/services/Onboarding'


export const useOnboardingStore = defineStore('onBoardingStore', () => {
    const step =ref(1);
    const skill_title = ref('');
    const overview = ref('')
    const location = ref('')
    const employment_type = ref('')
    const highest_education = ref('')
    const rate = ref('')
    const availability = ref('')
    const ciso = ref("")
    const siso =  ref("")
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
  min_rate:'',
  max_rate:''
});
let verifyIdentityData = ref({
  country: '',
  document_type: '',
  front: '',
  back: '',
  confirm: ''
});
const businessDetails = ref({
  business_name: '',
  location: '',
  industry: [],
  about_business: '',
  website: '',
  business_service: '',
  business_email: '',
  company_logo: null,
  company_type: ''
})
    const submitTalentPortfolio = async() => {
            let payload = {
              portfolio: {
                title: portfolio.value.title,
                client_name: portfolio.value.client_name,
                job_type: portfolio.value.job_type,
                location: portfolio.value.location,
                min_rate: portfolio.value.min_rate,
                max_rate: portfolio.value.max_rate,
                tags: portfolio.value.tags,
                cover_image: portfolio.value.cover_image,
                body: portfolio.value.body
              }
            }
try {
  let res = await handleTalentPortfolio(payload)
  return res
} catch (error) {
  /**/
}
    }
    const submitBusinessPortfolio = async(payload) => {
      try{
        let res = await handleBusinessPortfolio(payload)
        return res
      }catch (error) {
        /**/
      }
    }
    const submitTalentWorkDetails = async() => {
      let payload = {
        skill_title: skill_title.value,
        overview: overview.value,
        siso: siso.value,
        ciso: ciso.value,
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
            try {
              let res = await handleTalentWorkDetails(payload)
              return res
            } catch (error) {
              /**/
            }

    }
    const submitBusinessDetails = async () => {
            let payload = {
              business_name: businessDetails.value.business_name,
              location: siso.value,
              siso: siso.value,
              ciso: ciso.value,

              industry: businessDetails.value.industry,
              about_business: businessDetails.value.about_business,
              website: businessDetails.value.website,
              business_service: businessDetails.value.business_service,
              business_email: businessDetails.value.business_email,
              company_logo: businessDetails.value.company_logo,
              company_type: businessDetails.value.company_type
            }
      try {
        let res = await handleBusinessDetails(payload)
        return res
      } catch (error) {
        /**/
      }
    }
    const handleVerifyIdentity = async () => {
      let payload = {
        country: verifyIdentityData.value.country,
        document_type: verifyIdentityData.value.document_type,
        front: verifyIdentityData.value.front,
        back: verifyIdentityData.value.back,
        confirm: verifyIdentityData.value.confirm
      }
      try {
        let res = await verifyIdentity(payload)
        return res
      } catch (error) {
        /**/
      }
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
      handleVerifyIdentity,
      verifyIdentityData,
      businessDetails,
      ciso,
      siso
    }
})