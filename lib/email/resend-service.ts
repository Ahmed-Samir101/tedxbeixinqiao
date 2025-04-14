"use server"

import { Resend } from 'resend';
import { config } from 'dotenv';

config();

// Create a new Resend instance with your API key from the environment variable
const resend = new Resend(process.env.RESEND_API_KEY as string);

/**
 * Send a speaker application email notification
 */
export async function sendSpeakerApplicationEmail(applicationData: any) {
  try {
    const response = await resend.emails.send({
      from: 'forms@tedxbeixinqiao.com',
      to: 'frank.liang@tedxbeixinqiao.com',
      subject: `Speaker Application: ${applicationData.fullName}`,
      html: `
        <h2>New Speaker Application Received</h2>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <h3>Personal Information</h3>
        <ul>
          <li><strong>Full Name:</strong> ${applicationData.fullName}</li>
          <li><strong>Available in Beijing:</strong> ${applicationData.availableInBeijing}</li>
          <li><strong>Mobile Phone:</strong> ${applicationData.mobilePhone}</li>
          <li><strong>WeChat ID:</strong> ${applicationData.wechatId}</li>
          <li><strong>Prior TED Talk:</strong> ${applicationData.priorTedTalk}</li>
          <li><strong>Job:</strong> ${applicationData.job}</li>
          <li><strong>Gender:</strong> ${applicationData.gender}</li>
          ${applicationData.remarks ? `<li><strong>Remarks:</strong> ${applicationData.remarks}</li>` : ''}
        </ul>
        <h3>Presentation Idea</h3>
        <p>${applicationData.ideaPresentation}</p>
        ${applicationData.websiteUrl ? `<p><strong>Website URL:</strong> <a href="${applicationData.websiteUrl}">${applicationData.websiteUrl}</a></p>` : ''}
        <p><em>PDF attachment information is not included in this email.</em></p>
      `,
    });
    
    return { success: true, data: response };
  } catch (error) {
    console.error('Failed to send application email:', error);
    return { success: false, error };
  }
}

/**
 * Send a speaker nomination email notification
 */
export async function sendSpeakerNominationEmail(nominationData: any) {
  try {
    const response = await resend.emails.send({
      from: 'forms@tedxbeixinqiao.com',
      to: 'frank.liang@tedxbeixinqiao.com',
      subject: `Speaker Nomination: ${nominationData.fullName}`,
      html: `
        <h2>New Speaker Nomination Received</h2>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <h3>Nominee Information</h3>
        <ul>
          <li><strong>Full Name:</strong> ${nominationData.fullName}</li>
          <li><strong>Contact:</strong> ${nominationData.contact}</li>
          <li><strong>Prior TED Talk:</strong> ${nominationData.priorTedTalk}</li>
          <li><strong>Remarks:</strong> ${nominationData.remarks}</li>
          ${nominationData.websiteUrl ? `<li><strong>Website URL:</strong> <a href="${nominationData.websiteUrl}">${nominationData.websiteUrl}</a></li>` : ''}
        </ul>
      `,
    });
    
    return { success: true, data: response };
  } catch (error) {
    console.error('Failed to send nomination email:', error);
    return { success: false, error };
  }
}