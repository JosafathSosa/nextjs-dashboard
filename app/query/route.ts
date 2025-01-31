import postgres from "postgres";
import { NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { 
  ssl: "require",
  idle_timeout: 20  // Importante para conexiones persistentes
});

async function listInvoices() {
  // Agrega return y await
  return await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;
}

export async function GET() {
  try {
    const invoices = await listInvoices();
    console.log('Resultado de la consulta:', invoices);  // Agrega esto para debug
    return NextResponse.json(invoices);
  } catch (error) {
    console.error('Error en GET:', error);  // Log detallado
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}