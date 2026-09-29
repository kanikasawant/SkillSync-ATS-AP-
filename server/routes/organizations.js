import { Router } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { organizations } from '../db/schema.js';

const router = Router();

// GET /api/organizations - Fetch all organizations
router.get('/', async (req, res) => {
  try {
    const allOrgs = await db.select().from(organizations);
    return res.json({ success: true, data: allOrgs });
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch organizations', details: error.message });
  }
});

// GET /api/organizations/:id - Fetch organization by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.select().from(organizations).where(eq(organizations.id, id));
    
    if (result.length === 0) {
      return res.status(404).json({ success: false, error: 'Organization not found' });
    }
    
    return res.json({ success: true, data: result[0] });
  } catch (error) {
    console.error(`Error fetching organization ${req.params.id}:`, error);
    return res.status(500).json({ success: false, error: 'Failed to fetch organization', details: error.message });
  }
});

// POST /api/organizations - Create new organization
router.post('/', async (req, res) => {
  try {
    const { id, name, logoUrl, website, industry, company_size, description, status } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ success: false, error: 'Organization name is required' });
    }

    if (status !== undefined && status !== null) {
      const normalizedStatus = status.toString().toLowerCase();
      if (!['active', 'expired'].includes(normalizedStatus)) {
        return res.status(400).json({ success: false, error: 'Status must be active or expired' });
      }
    }

    const orgId = id || `org-${Date.now()}`;
    const orgStatus = (status && ['active', 'expired'].includes(status.toString().toLowerCase())) 
      ? status.toString().toLowerCase() 
      : 'active';
    const now = new Date();

    const [newOrg] = await db.insert(organizations).values({
      id: orgId,
      name: name.trim(),
      logoUrl: logoUrl || null,
      website: website || null,
      industry: industry || null,
      company_size: company_size || null,
      description: description || null,
      status: orgStatus,
      createdAt: now,
      updatedAt: now,
    }).returning();

    return res.status(201).json({ success: true, data: newOrg });
  } catch (error) {
    console.error('Error creating organization:', error);
    if (error.code === '23505') { // Postgres duplicate key error code
      return res.status(409).json({ success: false, error: 'Organization with this ID already exists' });
    }
    return res.status(500).json({ success: false, error: 'Failed to create organization', details: error.message });
  }
});

// PUT /api/organizations/:id - Update existing organization
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, logoUrl, website, industry, company_size, description, status } = req.body;

    const existing = await db.select().from(organizations).where(eq(organizations.id, id));
    if (existing.length === 0) {
      return res.status(404).json({ success: false, error: 'Organization not found' });
    }

    const updateData = {
      updatedAt: new Date(),
    };

    if (name !== undefined) {
      if (!name || name.trim() === '') {
        return res.status(400).json({ success: false, error: 'Organization name cannot be empty' });
      }
      updateData.name = name.trim();
    }
    if (logoUrl !== undefined) updateData.logoUrl = logoUrl || null;
    if (website !== undefined) updateData.website = website || null;
    if (industry !== undefined) updateData.industry = industry || null;
    if (company_size !== undefined) updateData.company_size = company_size || null;
    if (description !== undefined) updateData.description = description || null;
    if (status !== undefined && status !== null) {
      const normalizedStatus = status.toString().toLowerCase();
      if (!['active', 'expired'].includes(normalizedStatus)) {
        return res.status(400).json({ success: false, error: 'Status must be active or expired' });
      }
      updateData.status = normalizedStatus;
    }

    const [updatedOrg] = await db.update(organizations)
      .set(updateData)
      .where(eq(organizations.id, id))
      .returning();

    return res.json({ success: true, data: updatedOrg });
  } catch (error) {
    console.error(`Error updating organization ${req.params.id}:`, error);
    return res.status(500).json({ success: false, error: 'Failed to update organization', details: error.message });
  }
});

// DELETE /api/organizations/:id - Delete organization
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await db.select().from(organizations).where(eq(organizations.id, id));
    
    if (existing.length === 0) {
      return res.status(404).json({ success: false, error: 'Organization not found' });
    }

    await db.delete(organizations).where(eq(organizations.id, id));
    return res.json({ success: true, message: `Organization ${id} successfully deleted` });
  } catch (error) {
    console.error(`Error deleting organization ${req.params.id}:`, error);
    return res.status(500).json({ success: false, error: 'Failed to delete organization', details: error.message });
  }
});

export default router;
