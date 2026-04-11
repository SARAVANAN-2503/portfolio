# Deployment Guide

This system is designed for a simple, zero-cost deployment on modern cloud platforms.

## Recommended Stack
- **Frontend**: Vercel (Next.js native support)
- **Backend**: Render or Railway (Persistent Express process)
- **Database**: SQLite (No external managed DB required)

## Frontend (Vercel)
1. Link your GitHub repository.
2. Set Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Your backend URL.
3. Deploy.

## Backend (Render)
1. Create a "Web Service".
2. Set Environment Variables:
   - `PORT`: 4000
   - `JWT_SECRET`: Generate a secure random string.
   - `DATABASE_PATH`: `/data/portfolio.db`
3. **Important**: Add a "Disk" under Advanced settings.
   - Mount Path: `/data`
   - This ensures your SQLite database persists across redeploys.
4. Deploy.

## CI/CD
We recommend GitHub Actions for automated type-checking and testing. Samples are provided in `.github/workflows/` (though not yet fully implemented in this local version).
