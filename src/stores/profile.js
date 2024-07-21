import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getUserProfile,
  updateProfilePhoto,
  updateBio,
  updateOverview,
  addWorkDetails,
  addSkills,
  addEducation,
  updateEducation,
  updateEmployment,
  addCertificate,
  updateCertificate,
  updatePortfolio,
  getSinglePortfolio,
  updateBusinessDeatils,
  deletePortfolio
} from '@/services/Profile'

export const useUserProfile = defineStore('profile', () => {
  const user = ref({})

  const profileImage = ref('')

  const businessDeatils = ref({
    first_name: '',
    last_name: '',
    business_name: '',
    location: '',
    industry: '',
    about_business: '',
    website: '',
    business_service: '',
    business_email: '',
    company_logo: '',
    company_type: '',
    social_media: '',
    social_media_two: '',
    ciso: '',
      siso: '',

  })
    const bioInfo = ref({
      first_name: '',
      last_name: '',
      skill_title: '',
      rate: '',
      location: '',
      linkedin: '',
      instagram: '',
      twitter: '',
      behance: '',
      facebook: '',
      ciso: '',
      siso: '',
      calendlylink: '',
      experienceLevel: '',
      phoneNumber:''
    })

  const overview = ref('')
  const employment_details = ref({
    company_name: '',
    title: '',
    employment_type: '',
    start_date: '',
    end_date: '',
    description: '',
    currently_working_here: 'no'
  })
  const top_skills = ref([])
  const education = ref({
    school_name: '',
    degree: '',
    start_date: '',
    end_date: '',
    description: '',
    currently_schooling_here: 'no'
  })
  const certificateDetails = ref({
    title: '',
    institute: '',
    certificate_year: '',
    certificate_link: '',
    currently_working_here: 'no',
    certificate_date: ''
  })
const singlePortfolio = ref({})

    const userProfile = async () => {
      try {
        user.value = await getUserProfile()
        return user.value
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }

      const handleUpdateProfilePhoto = async () => {
        let payload = {
          image: profileImage.value
        }
        try {
          let res = await updateProfilePhoto(payload)
          return res
        } catch (error) {
          /**/
        }
      }

  const handleUpdateBusinessDeatils = async () => {
    let payload = {
      first_name: businessDeatils.value.first_name,
      last_name: businessDeatils.value.last_name,
      business_name: businessDeatils.value.business_name,
      location: businessDeatils.value.location,
      industry: businessDeatils.value.industry,
      about_business: businessDeatils.value.about_business,
      website: businessDeatils.value.website,
      business_service: businessDeatils.value.business_service,
      business_email: businessDeatils.value.business_email,
      company_logo: businessDeatils.value.company_logo,
      company_type: businessDeatils.value.company_type,
      social_media: businessDeatils.value.social_media,
      social_media_two: businessDeatils.value.social_media_two
    }
    try {
      let res = await updateBusinessDeatils(payload)
      return res
    } catch (error) {
      /**/
    }
  }
  const handleUpdateBio = async () => {
    let payload = {
      first_name: bioInfo.value.first_name,
      last_name: bioInfo.value.last_name,
      skill_title: bioInfo.value.skill_title,
      rate: bioInfo.value.rate,
      ciso: bioInfo.value.ciso,
      siso: bioInfo.value.siso,
      linkedin: bioInfo.value.linkedin,
      instagram: bioInfo.value.instagram,
      twitter: bioInfo.value.twitter,
      behance: bioInfo.value.behance,
      facebook: bioInfo.value.facebook,
      booking_link: bioInfo.value.calendlylink,
      experience_level: bioInfo.value.experienceLevel,
      phone_number: bioInfo.value.phoneNumber
    }
    try {
      let res = await updateBio(payload)
      return res
    } catch (error) {
      /**/
    }
  }
  const handleUpdateOverview = async () => {
    let payload = {
      overview: overview.value
    }
    try {
      let res = await updateOverview(payload)
      return res
    } catch (error) {
      /**/
    }
  }
  const handleAddWorkDetails = async () => {
    let payload = {
      employment_details: {
        company_name: employment_details.value.company_name,
        title: employment_details.value.title,
        employment_type: employment_details.value.employment_type,
        description: employment_details.value.description,
        start_date: employment_details.value.start_date,
        end_date: employment_details.value.end_date,
        currently_working_here: employment_details.value.currently_working_here
      }
    }
    try {
      let res = await addWorkDetails(payload)
      return res
    } catch (error) {
      /**/
    }
  }
  const handleAddSkills = async () => {
    let payload = {
      top_skills: top_skills.value
    }
    try {
      let res = await addSkills(payload)
      return res
    } catch (error) {
      /**/
    }
  }
  const handleAddEducation = async () => {
    let payload = {
      education: {
        school_name: education.value.school_name,
        degree: education.value.degree,
        description: education.value.description,
        start_date: education.value.start_date,
        end_date: education.value.end_date,
        currently_schooling_here: education.value.currently_schooling_here
      }
    }
    try {
      let res = await addEducation(payload)
      return res
    } catch (error) {
      /**/
    }
  }
  const handleDeleteEducation = async (id) => {
    try {
      let res = await deletePortfolio(id)
      return res
    } catch (error) {
      /**/
    }
  }
  const handleUpdateEducation = async (id, payload) => {
    try {
      let res = await updateEducation(id, payload)
      return res
    } catch (error) {
      /**/
    }
  }
  const handleUpdateEmploymentDetails = async (id, payload) => {
    try {
      let res = await updateEmployment(id, payload)
      return res
    } catch (error) {
      /**/
    }
  }
  const handleAddCertificate = async () => {
    let payload = {
      title: certificateDetails.value.title,
      institute: certificateDetails.value.institute,
      certificate_date: certificateDetails.value.certificate_date,
      certificate_year: certificateDetails.value.certificate_year,
      certificate_link: certificateDetails.value.certificate_link,
      currently_working_here: certificateDetails.value.currently_working_here
    }
    try {
      let res = await addCertificate(payload)
      return res
    } catch (error) {
      /**/
    }
  }
  const handleUpdateCertificate = async (id, payload) => {
    try {
      let res = await updateCertificate(id, payload)
      return res
    } catch (error) {
      /**/
    }
  }
  const handleUpdatePortfolio = async (id, payload) => {
    try {
      let res = await updatePortfolio(id, payload)
      return res
    } catch (error) {
      /**/
    }
  }
  const handleGetSinglePortfolio = async (id) => {
    try {
      singlePortfolio.value = await getSinglePortfolio(id)
      return singlePortfolio.value
    } catch (error) {
      /**/
    }
  }

  return {
    user,
    userProfile,
    handleUpdateProfilePhoto,
    handleUpdateBio,
    handleUpdateOverview,
    handleAddWorkDetails,
    handleAddSkills,
    handleAddEducation,
    profileImage,
    bioInfo,
    overview,
    employment_details,
    top_skills,
    education,
    handleUpdateEducation,
    handleUpdateEmploymentDetails,
    certificateDetails,
    handleAddCertificate,
    handleUpdateCertificate,
    handleUpdatePortfolio,
    handleGetSinglePortfolio,
    singlePortfolio,
    businessDeatils,
    handleUpdateBusinessDeatils,
    handleDeleteEducation
  }
})
