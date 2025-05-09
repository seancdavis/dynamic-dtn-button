import { createCanvas, registerFont } from 'canvas';
import type { APIRoute } from 'astro';

// Register the font
registerFont('./public/fonts/Roboto-Bold.ttf', { family: 'Roboto', weight: 'bold' });

export const GET: APIRoute = async ({ params }) => {
  // Get route parameters
  const { owner, repo } = params;

  // Create canvas (1600x900)
  const canvas = createCanvas(1600, 900);
  const ctx = canvas.getContext('2d');

  // Set white background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 1600, 900);

  // Set text style
  ctx.fillStyle = 'black';
  ctx.font = 'bold 80px Roboto';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw owner/repo text
  ctx.fillText(`${owner}/${repo}`, 800, 450);

  // Convert canvas to JPEG buffer
  const buffer = canvas.toBuffer('image/jpeg');

  // Return the image with proper headers
  return new Response(buffer, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Content-Length': buffer.length.toString(),
    },
  });
};

// Ensure this runs server-side
export const prerender = false;
