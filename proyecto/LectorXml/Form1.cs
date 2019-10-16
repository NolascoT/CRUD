using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Diagnostics;
using System.IO;
using System.Xml;
using System.Xml.Linq;


namespace LectorXml
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            OpenFileDialog buscar = new OpenFileDialog();
            string extension;

            if(buscar.ShowDialog() == DialogResult.OK)
            {
                extension = Path.GetExtension(buscar.FileName);
                if(extension==".xml")
                {
                    textBox1.Text = buscar.FileName;
                }
                else
                {
                    MessageBox.Show("Archivo Incorrecto");
                }
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            string UMLClassDiagram = "UMLClassDiagram";
            string superitem = "superitem";
            string UMLAssociation = "UMLAssociation";
            string point = "point";
            string UMLGeneralization = "UMLGeneralization";
            string valueAst = "value=\"*\"";
            string valueUno = "value=\"1\"";
            string valueNulo = "value=\"\"";
            char quitalo = '+';
            char quitalo2 = ':';
            char quitalo3 = '_';
            char quitalo4 = '#';

            string line;

            string NewXml = "";
            StreamReader seCargoXml = new StreamReader(textBox1.Text);
            
            while ((line = seCargoXml.ReadLine()) != null)
            {
                if (line.Contains(UMLClassDiagram)
                    || line.Contains(superitem) || line.Contains(UMLAssociation)
                    || line.Contains(point) || line.Contains(UMLGeneralization)
                    || line.Contains(valueAst) || line.Contains(valueUno)
                    || line.Contains(valueNulo))
                {
                }
                else
                {
                    if (line.Contains(quitalo))
                    {
                        line = line.Replace("+", "");
                    }
                    if (line.Contains(quitalo2))
                    {
                        line = line.Replace(":", " ");
                    }
                    if (line.Contains(quitalo3))
                    {
                        line = line.Replace("_", "");
                    }
                    if (line.Contains(quitalo4))
                    {
                        line = line.Replace("#", "");
                    }
                    NewXml += line;
                    richTextBox1.Text = NewXml;
                }
            } 
            seCargoXml.Close();
            Console.WriteLine(NewXml);

            XmlTextReader reader = new XmlTextReader(new StringReader(NewXml));          
            StringWriter writer = new StringWriter();
            
            while (reader.Read())
            {
                //cadena que almacenará la indentación
                string indentado = new string('\t', reader.Depth);
                //evaluando el tipo de nodo
                switch (reader.NodeType)
                {
                    //si tipo de nodo es: <?xml version='1.0' encoding='ISO-8859-1'?>
                    case XmlNodeType.XmlDeclaration:
                        //usamos Value para imprimir "xml version='1.0' encoding='ISO-8859-1'"
                        writer.WriteLine("<?{0}?>", reader.Value);
                        break;
                    //if el tipo de nodo es un comentario
                    case XmlNodeType.Comment:
                        writer.WriteLine("{0}<!--{1}-->", indentado, reader.Value);
                        break;
                    //si tipo de nodo es elemento
                    case XmlNodeType.Element:
                    {
                        //y si tiene atributos
                        if (reader.HasAttributes)
                        {
                            //entonces creamos una cadena "atributos" que guardará
                            //los atributos de este nodo.
                            if (reader.LocalName == "UMLClass")
                            {                                        
                                writer.WriteLine("{0}<UMLClass>", indentado);
                            }
                            string atributos = null;
                            string Id = null;
                            for (int i = 0; i < reader.AttributeCount; i++)
                            {
                                //nos movemos para realizar la lectura del atrbiuto de acuerdo al índice.
                                reader.MoveToAttribute(i);
                                //una vez que estamos ubicados en la posición correcta,
                                //leemos el nombre del atributo, como también el valor.                                        
                                if (i==1&& reader.Name=="value")
                                {
                                    Id += reader.Value;
                                    writer.WriteLine("{0}<Id>{1}</Id>", indentado, Id);  
                                }
                                if (i==0&&reader.Name!="id"&&reader.LocalName!="UMLClass")
                                { 
                                    atributos += reader.Value;
                                    writer.WriteLine("{0}<atributo>{1}</atributo>", indentado, atributos);
                                }
                            }
                            //despues de haber leido los atributos del elemento...
                            //moveremos el puntero al elemento.
                            reader.MoveToElement();                            
                        } 
                        else
                        {
                            //si la profundidad del nodo es diferente a 2
                            if (reader.Depth != 2)
                                writer.WriteLine("{0}<{1}>", indentado, reader.LocalName);
                            else
                                writer.Write("{0}<{1}>", indentado, reader.LocalName);
                        }
                    }
                    break;
                    //if el tipo de nodo es contenido.
                    case XmlNodeType.Text:
                        //imprimimos el contenido.
                        writer.Write(reader.Value);
                        break;
                    //si el tipo de nodo es un elemento final o de cierre.
                    case XmlNodeType.EndElement:
                        //y además, averiguamos si es el que Depth es 2 entonces 
                        //no le agregamos la indentación, imprimiendo de esta manera: 
                        //<title>XML Programming</title> en vez de <title>XML Programming        </title>
                        if (reader.Depth == 2)
                            writer.WriteLine("</{0}>", reader.LocalName);
                        else
                            //con indentación tabPrefix
                            writer.WriteLine("{0}</{1}>", indentado, reader.LocalName);
                        break;
                }
            }
            //cerramos el reader
            reader.Close();
            //mostrar los resultados.
            string text = writer.ToString();
            Console.Write(text);
            richTextBox2.Text = writer.ToString();
            /*
             * resultado=<umldiagrams>
	<UMLClass>
		<Id>Platillo</Id>
		<atributo>nombre  string </atributo>
		<atributo>precio float </atributo>
		<atributo>descripcion string</atributo>
	</UMLClass>
	<UMLClass>
		<Id>Empleado</Id>
		<atributo>nombre string</atributo>
		<atributo>apellidosp string </atributo>
		<atributo>apellidom string</atributo>
		<atributo>matricula int</atributo>
	</UMLClass>
	<UMLClass>
		<Id>Chef</Id>
		<atributo>sueldo float</atributo>
		<atributo>cargo  string</atributo>
		<atributo>especialidad string</atributo>
	</UMLClass>
	<UMLClass>
		<Id>Restaurante</Id>
		<atributo>nombre string</atributo>
		<atributo>domicilio  string</atributo>
	</UMLClass>
	<UMLClass>
		<Id>Mesero </Id>
		<atributo>mesa int</atributo>
		<atributo>sueldo float</atributo>
	</UMLClass>
	<UMLClass>
		<Id>Encargado </Id>
		<atributo>sucursal string</atributo>
	</UMLClass>
	<Id>tiene</Id>
	<Id>tiene </Id>
</umldiagrams>*/

            var doc = XDocument.Parse(text);

            var result = from umldiagrams in doc.Descendants("umldiagrams")
                         select new
                         {                             
                             UMLClass = new
                             {
                                 Id = umldiagrams.Element("UMLClass").Element("Id").Value
                             }
                         };

            for (int j=0;j<=result.Count();j++)
            {
                Console.WriteLine(j);
            }
        }

        private void button3_Click(object sender, EventArgs e)
        {

        }
    }
}
